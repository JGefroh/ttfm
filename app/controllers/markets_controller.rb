class MarketsController < ApplicationController
  def index
    @markets = Market.all
    if params[:find_within]
      search_center = Geocoder::Calculations.geographic_center([[params[:sw_lat], params[:sw_lng]], [params[:ne_lat], params[:ne_lng]]])
      @markets = @markets.within_bounding_box([params[:sw_lat], params[:sw_lng], params[:ne_lat], params[:ne_lng]])
      if params[:ignore]
        @markets = @markets.where.not(id: params[:ignore].split(','))
      end
    elsif params[:position_known] == 'true'
      search_distance_in_miles = 60
      search_center = [params[:current_lat], params[:current_lng]]
      @markets = @markets.near(search_center, search_distance_in_miles)
    end
    render json: @markets
  end

  def create
    Market.create()
  end


  def export_data
    if has_export_code
      render json: {error: 'This feature hasn\'t been implemented yet.'}, root: false, status: 403 and return
    else
      send_unauthorized_response
    end
  end


  def check_import_data
    if has_import_code
      uri = URI('https://data.hawaii.gov/api/views/nqfm-3etr/rows.json?accessType=DOWNLOAD')
      http = Net::HTTP.new(uri.host, uri.port)
      http.use_ssl = true
      json= JSON.parse(http.get(uri.request_uri).body)

      render json: scrub(json) and return
    else
      send_unauthorized_response
    end
  end

  def import_data
    if has_import_code && params[:data].present?
      markets = params[:data].select{|market| market[:valid]}
      created_markets = []
      duplicate_markets = []
      synced_markets = []
      markets.each do |market|
        duplicate_market = market_exists(market)
        if duplicate_market.present?
          if duplicate_market.days_of_week != market[:days_of_week]
            duplicate_market.update(days_of_week: market[:days_of_week])
            synced_markets << MarketSerializer.new(duplicate_market, root: false)
          else
            duplicate_markets << MarketSerializer.new(duplicate_market, root: false)
          end
        else
          created_markets << MarketSerializer.new(Market.create(name: market[:name], address: market[:address]), root: false)
        end
      end
      render json: {duplicates: duplicate_markets, created: created_markets, synced: synced_markets}, root: false and return
    else
      send_unauthorized_response
    end
  end

  private def location_params
    params.require(:location).permit(:name, :address)
  end

  def has_export_code
    return params[:admin_code] && params[:admin_code] == ENV['ADMIN_CODE_TO_EXPORT']
  end

  def has_import_code
    return params[:admin_code] && params[:admin_code] == ENV['ADMIN_CODE_TO_IMPORT']
  end

  def send_unauthorized_response
    render json: {error: 'You are unauthorized to access this command - your information has been logged and reported.'}, root: false, status: 403 and return
  end

  def market_exists(market)
    if (market)
      return Market.find_by(name: market[:name]) || Market.find_by(address: market[:address])
    end
  end

  def scrub(data)
    markets = []
    data['data'].each do |item|
      result = {}
      result[:name] = parseName(item[8])
      result[:address] = parseAddress(item[17][0])
      result[:days_of_week] = parseSchedule(item)
      result[:valid] = result[:name].present? && result[:address].present? && result[:days_of_week].present?
      markets << result
    end
    return markets
  end

  def parseName(string)
    return string.respond_to?('split') ? string.split(/\r?\n/)[0] : nil
  end

  def parseAddress(string)
    begin
      address = JSON.parse(string)
      return addressOneLine = ((address['address'].present? ? address['address'] + ' ' : '') +
                (address['city'].present? ? address['city'] + (address['state'].present? ? ', ' : ' ') : '') +
                (address['state'].present? ? address['state'] + ' ' : '') +
                (address['zip'].present? ? address['zip'] + '' : '')).strip
    rescue Exception => e
      puts "Failed to find address in: #{string} due to #{e}"
    end
  end

  def parseSchedule(market)
    daysOfWeek = ''
    daysOfWeek += '_sun_' if !!market[9]
    daysOfWeek += '_mon_' if !!market[10]
    daysOfWeek += '_tue_' if !!market[11]
    daysOfWeek += '_wed_' if !!market[12]
    daysOfWeek += '_thu_' if !!market[13]
    daysOfWeek += '_fri_' if !!market[14]
    daysOfWeek += '_sat_' if !!market[15]
    return daysOfWeek;
  end

    # function scrub(data) {
    #   var clean = [];
    #   angular.forEach(data, function(items) {
    #     angular.forEach(items, function(item) {
    #       clean.push(item.slice(8));
    #     })
    #   });
    #
    #   var asObjects = [];
    #   angular.forEach(clean, function(marketArray, index) {
    #     var name = null;
    #     var location = null;
    #     var address = null;
    #     var addressOneLine = null;
    #     var website = null;
    #     var contactPhone = null;
    #     var contactEmail = null;
    #     var latitude = null;
    #     var longitude = null;
    #     if (marketArray[0]) {
    #       name = marketArray[0].split ? marketArray[0].split('\n')[0] : null;
    #     }
    #     if (marketArray[9]) {
    #       latitude = marketArray[9][1] ? Number(marketArray[9][1]) : null;
    #       longitude = marketArray[9][2] ? Number(marketArray[9][2]) : null;
    #       address = angular.fromJson(marketArray[9][0]);
    #       if (address) {
    #         addressOneLine = (address.address ? address.address + ' ' : '')
    #         + (address.city ? address.city + (address.state ? ', ' : ' ') : '')
    #         + (address.state ? address.state + ' ' : '')
    #         + (address.zip ? address.zip + '' : '');
    #       }
    #     }
    #     if (marketArray[11]) {
    #       if (marketArray[11].indexOf('http') !== -1 || marketArray[11].indexOf('www') !== -1) {
    #         website = marketArray[11].trim();
    #       }
    #     }
    #     if (!website && marketArray[12]) {
    #       website = marketArray[12][0];
    #     }
    #     if (marketArray[14]) {
    #       if (marketArray[14].indexOf('@') === -1) {
    #         contactPhone = marketArray[14];
    #       }
    #       else if (marketArray[14].indexOf('@') !== -1) {
    #         contactEmail = marketArray[14];
    #       }
    #     }
    #     if (!contactEmail && marketArray[15]) {
    #       contactEmail = marketArray[15];
    #     }
    #     var market = {
    #       id: index,
    #       name:  name,
    #       latitude: latitude,
    #       longitude: longitude,
    #       schedule: {
    #         sunday: !!marketArray[1],
    #         monday: !!marketArray[2],
    #         tuesday: !!marketArray[3],
    #         wednesday: !!marketArray[4],
    #         thursday: !!marketArray[5],
    #         friday: !!marketArray[6],
    #         saturday: !!marketArray[7],
    #         time: marketArray[8]
    #       },
    #       venue: {
    #         address: address,
    #         addressOneLine: addressOneLine,
    #         info: marketArray[10],
    #         latitude: latitude,
    #         longitude: longitude
    #       },
    #       organizer: {
    #         website: website,
    #         contact: {
    #           name: marketArray[13],
    #           phone: contactPhone,
    #           email: contactEmail
    #         }
    #       }
    #     }
    #     if (market.latitude && market.longitude) {
    #       asObjects.push(market);
    #     }
    #   });
    #   return asObjects;
    # }
    # return service;
end
