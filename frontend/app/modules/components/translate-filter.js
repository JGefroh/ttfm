(function() {
  'use strict';
  angular
    .module('jgefroh.components')
    .filter('translate', ['$window', Filter]);

  var japaneseTranslations = {
    'FARMER\'S MARKET MAIN ENTRANCE':'ファーマーズ・マーケット・正門',
    'Hawaii Farm Bureau Information Booth':'ハワイ・ファーム局情報ブース',
    'Give It Fresh Booth':'ギブ・イット・フレッシュー・ブース　（新鮮な食べ物を配るブース）（寄付ブース）',
    '':'',
    'ROW A':'A 列',
    'Koko Crater Coffee Roasters':'ココクレーター・コーヒー・ロースター',
    'Aloun Farms':'アルーン・ファームズ',
    'Nalo LIFE':'ナロLIFE',
    'Akamai Food\'s':'アカマイ・フーズ',
    'Marine Agrifuture Sea Asparagus':'オラカイ・ハワイ・海のアスパラガス マリネ・アグリフューチャ・海のアスパラガス（海農業将来・海のアスパラガス)',
    'Greenpoint Nursery':'グリーンポイント・ナーサリー（苗床）',
    'Hawaiian Chip Company':'ハワイアン・チップ・カンパニー',
    'Kahuku/Kahuku Na\'ono':'カフク/カフク・ナオノ',
    'Honolulu Gourmet':'ホノルル・グルメ',
    'Alii Seafood':'アリイ・シーフード',
    'North Shore Farms LLC dba BWT':'ノース・ショア・ファームズ',
    'PacifiKool':'パシフィコール',
    'Honolulu Burger Company':'ホノルル・バーガー・カンパニー',
    'Loho Street Farm':'ロホ・ストリート・ファーム（農場）',
    'Thoune HongPhao Farm':'Thoune HongPhao・ファーム（農場）',
    'Hawaii Beekeepers Association':'ハワイの養蜂家協会（蜂蜜）',
    'Sea Salts of Hawaii':'ハワイの海塩',
    'Made in Hawaii Foods':'メイド・イン・ハワイ・フーズ',
    'Ono Pops':'オノ・パップス',
    'Hibachi':'ヒバチ',
    'Bale Sandwich 24':'バーレ・サンドイッチ２４',
    'Happy Cakes':'ハッピー・ケーキ',
    'Kukui Sausage':'ククイ・ソーセージ',
    '':'',
    'ROW B':'B列',
    'Two Hot Tomatoes':'ツー・ホット・トマト',
    'Hanalei Taro Co.':'ハナレイ・タロ・カンパニー',
    'Akaka Falls Farm':'アカカ・フォールズ・ファーム（アカカの滝・ファーム）',
    'Mauna Kea Tea':'マウナ・ケア・ティ（茶）',
    'Bueno Salsa':'ブエノ・サルサ',
    'Otsuji Farm':'オツジ・ファーム（農場）',
    'Nita\'s ':'ニタの',
    'Dina\'s Garden':'ディナ・ガーデン',
    'Daizu Tei':'ダイズ・テイ',
    'Vilath Farm':'ヴィラッツ・ファーム（農場）',
    'Olay Thai':'オレー・タイ',
    'Grace Foods':'グレス・フーズ',
    'Waimanalo Country Farms':'ワイマナロ・カントリー・ファームズ（農場）',
    'Aikane Plantation Coffee':'アイカネ・プランテーション・コーヒー',
    'Penny\'s Orchids':'ペンニ・オーキッド',
    '':'',
    'ROW C':'C列',
    'SKA Tropicals':'SKA・トロピカルス',
    'PIT Farm':'PIT・ファーム（農場）',
    'Ho Farms':'ホ・ファームズ（農場）',
    'Milner\'s':'ミルナの（農場）',
    'La Tour Bakehouse (Ba-Le Bakery)':'ラ・ツーア・ベーカハウス（パン屋）',
    '':'',
    'ROW D':'D列',
    'Kihene':'キヘネ',
    'Ahualoa Farm':'アフアロア・ファームズ',
    'Big Island Abalone':'ビッグ・アイランド・アバロー二（あわび）',
    'Theng\'s Farm':'テング・ファーム（農場）',
    'Pig and the Lady':'ピッグ・アンド・ジ・レディー',
    'WOW Farm':'WOW・ファーム（農場）',
    'Licious Dishes':'リシャス・ディシャス',
    'Once Again':'ヲンス・アゲン（苗床）',
    'Frankies Nursery':'フランキーズ・ナーサリー（苗床）',
    'Growing Creations':'グローイング・クリエイションズ',
    'Paniolo Popcorn':'パニオロ・ポップコーン',
    '':'',
    'ROW E':'E列',
    'KCC Culinary Students':'KCC料理学生',
    'Cold Fyyre':'コルド・ファーヤ（アイスクリーム）',
    'Nosh':'ナシュ',
    'Grandma G\'s':'グランドマ・ジーズ',
    'Small Kine Farm':'スマール・カイン・ファーム',
    'Hawaiian Style Chili Company':'ハワイアン・スタイル・チリ・カンパニー',
    'North Shore Cattle Co.':'ノース・ショア・カットル・カンパニー',
    'Thai Farmers Association':'タイ・ファーマズ・アソシエーション（タイの農民組合）',
    '':'',
    'LAWN':'ローン（芝）',
    'Honey Girl Organic':'ハニー・ガール・オーガニック',
    'Big Island Bees':'ビッグ・アイランド・ビーズ（蜂蜜）',
    'Small Kine Farm':'スマール・カイン・ファーム（農場）',
    'Haleahi Floral Nursery':'ハレアヒ・フローラル・ナーサリー（苗床）',
    'Greenpoint Nursery':'グリーンポイント・ナーサリー（苗床)',
    'Hawaiian Crown Pineapple':'ハワイアン・クラウン・パイナプル'
  };
  function Filter($window) {
    return function(data) {
      try {
        if (isJapaneseBrowser() && japaneseTranslations[data]) {
          return japaneseTranslations[data];
        }
        return data;
      }
      catch (exception) {
        return data;
      }
      return data;
    }

    function isJapaneseBrowser() {
      var lang = $window.navigator.language || $window.navigator.userLanguage;
      if (lang === 'ja') {
        return true;
      }
      return false;
    }
  }
})();
