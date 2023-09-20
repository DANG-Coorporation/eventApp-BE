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

untuk migrasi jalankan _command_

```bash
  npm run migrate-db
```

## Membuat file .env

buat file .env pada _root directory_ dengan format sebagai berikut

```bash
NODE_ENV=development
PORT=5000
DB_NAME=event_app_dev
DB_HOST=localhost
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
