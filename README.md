# rest-shop-grabber

for run application
```
git clone https://github.com/Nightw0rk/rest-shop-grabber.git
cd rest-shop-grabber
docker-compose up
```

After up application in docker. Need update database product pricies
```
wget <docker-ip>:1001/update
```
Updating take 15-30 seconds. Please wait, in console compose you might see information 
like: 
```
Start parsing apodiscounter
Stop parsing apodiscounter
```

When wget return status "OK", You might get price product
```
wget <docker-ip>:1001?shopname=<shopname>&product_id=<id>
```

This all folks