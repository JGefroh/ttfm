# ttfm
:pineapple: HACC Farmer's Market Project


Required environment variables:
* ADMIN_CODE_TO_IMPORT
* ADMIN_CODE_TO_EXPORT
* ADMIN_CODE_TO_UPDATE


## Environment setup (Mac OSX - may apply to other environments):

### Frontend
1. Install [npm](https://nodejs.org/en/)
2. Install IDE of your choice
3. Install brunch globally.
  * `npm install -g brunch`
  * If you get errors installed global packages, run `sudo chown -R $USER /usr/local/` (see below).
4. Install bower globally.
  * `npm install -g bower`
  * If you get errors installed global packages, run `sudo chown -R $USER /usr/local/` (see below).  
5. Clone the repository (`git clone GITHUB_URL_HERE`).
6. Install local npm package files in the `frontend` folder.
  * `cd` into the project directory's `frontend` folder and run `npm install`.
7. Install local npm package files.
  * `cd` into the project directory's `frontend` folder and run `bower install`.
8. Launch your local environment
  * Run `brunch watch --server` from within the `frontend` directory.
  * Go to `localhost:3333` on your web browser to view the project.
  * Changes will be automatically detected.

## Issues
### npm errors
npm has permission issues depending on how it is installed. If installed via [Homebrew](http://brew.sh/), it should be OK. Otherwise, you may need to research how to fix it depending on the issue you're having. Some of the following links below may help:
* https://github.com/npm/npm/issues/194
* http://stackoverflow.com/questions/33181005/error-after-installing-mac-os-x-el-capitan


### Backend
1. Install Ruby.
2. Install Ruby on Rails.
3. Install postgres or DB.
3. Set environment variables, or use a program like `foreman` with `.env` files.
4. Run it with `rails s`, `bundle exec rails `, `foreman start -f Procfile-dev` or equivalent command.
5. Run postgres eg. `postgres -D /usr/local/var/postgres`

## Build for production:  
1. Run `brunch build --production`.
  * Currently supports environment-specific variables.
