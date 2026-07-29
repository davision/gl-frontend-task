FROM composer:2.9 AS vendor

WORKDIR /app

COPY composer.json composer.lock ./
RUN composer install \
    --no-interaction \
    --no-progress \
    --prefer-dist \
    --optimize-autoloader

FROM php:8.4-cli-alpine

WORKDIR /app

COPY --from=vendor /app/vendor ./vendor
COPY --from=vendor /usr/bin/composer /usr/bin/composer
COPY . .

EXPOSE 8080

CMD ["sh", "-c", "composer install --no-interaction --no-progress --prefer-dist && php -S 0.0.0.0:8080 -t public public/router.php"]
