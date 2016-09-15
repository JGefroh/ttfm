# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160915072958) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "market_vendors", force: :cascade do |t|
    t.integer  "vendor_id",           null: false
    t.integer  "market_id",           null: false
    t.datetime "created_at",          null: false
    t.datetime "updated_at",          null: false
    t.string   "booth_location"
    t.float    "at_market_longitude"
    t.float    "at_market_latitude"
  end

  create_table "markets", force: :cascade do |t|
    t.string   "name"
    t.float    "latitude"
    t.float    "longitude"
    t.string   "address"
    t.string   "days_of_week"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.string   "start_time"
    t.string   "end_time"
    t.string   "organization"
    t.boolean  "has_map"
  end

  create_table "vendors", force: :cascade do |t|
    t.string   "name",        null: false
    t.text     "description"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

end
