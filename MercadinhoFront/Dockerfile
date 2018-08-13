FROM php:7.2.6-apache
COPY ./MercadinhoFront/pages .
COPY htaccess.conf /etc/apache2/conf-enabled/htaccess.conf
RUN a2enmod rewrite
RUN chmod 755 /var/www/html
WORKDIR /var/www/html

