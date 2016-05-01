var mongoose = require('mongoose');
var Campground = require('./models/campground');


/*
Campground.create(
  { 
    name: 'Augustus Camp', 
    image: 'https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum'
  }
  , function(err, camp) {
      if (err) {
        console.log(err);
      } else {
        console.log('NEWLY CREATED CAMPGROUND: ');
        console.log(camp);
      }
});


Campground.create(
  { 
    name: 'Nietzsche Camp', 
    image: 'https://farm3.staticflickr.com/2464/3694344957_14180103ed.jpg',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum'
  }
  , function(err, camp) {
      if (err) {
        console.log(err);
      } else {
        console.log('NEWLY CREATED CAMPGROUND: ');
        console.log(camp);
      }
});
Campground.create(
   { 
    name: 'Confuscious Camp', 
    image: 'https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum'
   }
  , function(err, camp) {
      if (err) {
        console.log(err);
      } else {
        console.log('NEWLY CREATED CAMPGROUND: ');
        console.log(camp);
      }
});
Campground.create(
   {
    name: 'Confuscious Camp', 
    image: 'https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg',
    description: 'This is a huge granite hill, no bathrooms. No water. Beautiful granite!'
   }
  , function(err, camp) {
      if (err) {
        console.log(err);
      } else {
        console.log('NEWLY CREATED CAMPGROUND: ');
        console.log(camp);
      }
});*/

var data = [
  { 
    name: 'Confuscious Camp', 
    image: 'https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum'
   },
  { 
    name: 'Nietzsche Camp', 
    image: 'https://farm3.staticflickr.com/2464/3694344957_14180103ed.jpg',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum'
  },
  { 
    name: 'Augustus Camp', 
    image: 'https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum'
  }
];


function seedDB() {
  // Wipe everything out of our db
  Campground.remove({}, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Removed Campgrounds!');
      // Add a few campgrounds
      data.forEach(function(seed) {
        Campground.create(seed, function(err, data) {
          if (err) {
            console.log(err);
          } else {
            console.log("added a campground");
          }
        });  
      });
    }  
  });
  
  
  
  
  
  
  // Add a few comments
  
  
  
}

module.exports = seedDB;