module.exports = process.env.NODE_ENV=='production' ? 
{
    title: "Haval Club",
    httpserver:  "http://api.haval-club.ru/",
    imageserver:  "http://chinamobil.ru/",  

    newsimagesDir: "news/images/",
    imagesDir: "http://haval-club.ru/haval/images/",

    vendor: "haval/",
    removeExtraPathItem: 1,  // remove great-wall from /great-wall/haval/h9/
} 
: 
{
    title: "Haval Club DEBUG",
    httpserver:  "http://haval.local/",  
    imageserver:  "http://new.local/",  

    newsimagesDir: "news/images/",
    imagesDir: "/images/",

    vendor: "haval/",
    removeExtraPathItem: 1,  // remove great-wall from /great-wall/haval/h9/
}
;
