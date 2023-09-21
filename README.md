# Cara menjalankan server development dan migrasi DB

Untuk menjalankan server development, ada beberapa langkah yang harus dilakukan yaitu :

    1. install depedencies
    2. Migrasi DB
    3. Membuat file .env
    4. Run development

## Install depedencies

install _dependencies_ yang dibutuhkan dangan menjalankan _command_

```bash
  npm -i
```

## Migrasi DB

### Setup Database

Sebelum melakukan migrasi, pastikan MySQL service sudah dijalankan menggunakan XAMPP dan database sudah dibuat. apabila database belum dibuat, maka buat database dengan nama yang mengacu pada file config.json

```js
{
  "development": {
    "username": "root",
    "password": null,
    "database": "event_app_dev",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

untuk development kita bisa menggunakan nama _event_app_dev_.

### Migrasi

untuk migrasi jalankan _command_

```bash
  npm run migrate-db
```

## Membuat file .env

buat file .env pada _root directory_ dengan format sebagai berikut

```bash
NODE_ENV=development
PORT=5000
DB_NAME=(nama_database)
DB_HOST=host.docker.internal
DB_HOST_DEV=localhost
DB_PORT=(port mysql)
DB_USER=(user mysql)
DB_PASS=(password mysql)
```

## Menjalankan Development

Jalankan server development dengan _command_

```bash
npm run dev
```

# #Happy Hacking :)
