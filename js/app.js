
//array of places I would like to visit
var places=[
  {place:"Ozran,Goa",marker: markers[0]},
  {place:"Arambol,Goa",marker: markers[1]},
  {place:"Baga,Goa",marker: markers[2]},
  {place:"Vagator,Goa",marker: markers[3]},
  {place:"Anjuna,Goa",marker: markers[4]},
  {place:"Chapora Fort,Goa",marker: markers[5]}
];
// View Model
var PlaceViewModel = function() {
  self=this;
  self.placeList=ko.observableArray(places);
  self.filter = ko.observable("");
  self.filteredData = ko.computed(function() {
  var filter = self.filter().toLowerCase();
  if (!filter) {
    for(var i=0;i<markers.length;i++)
    {
      markers[i].setMap(map);
    }
    return places;
  } else {

    var filteredArray = ko.utils.arrayFilter(self.placeList(), function(item) {
      return item.place.toLowerCase().indexOf(filter) > -1;
    });

   for(var i=0;i<self.placeList().length;i++)
    {
      for(var j=0;j<filteredArray.length;j++)
      {
        if(self.placeList()[i]!=filteredArray[j])
        {
          markers[i].setMap(null);
        }
        else
        {
            markers[i].setMap(map);
            j=filteredArray.length;
        }
      }
    }
  /*  for(var i=0;i<markers.length;i++)
    {
      markers[i].setMap(null);
    }
    for(var j=0;j<filteredArray.length;j++)
    {
      filteredArray[j].marker.setMap(map);
    }*/
    return filteredArray;

}
});
self.displayInfo = function(value)
{
  console.log(value.marker);
   populateInfoWindow(value.marker,largeInfowindow);
   console.log("bvsjakjsj");
};
};
ko.applyBindings(new PlaceViewModel());
