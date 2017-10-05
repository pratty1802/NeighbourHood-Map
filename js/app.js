
//array of places I would like to visit
var places=[
  {place:"Ozran,Goa"},
  {place:"Arambol,Goa"},
  {place:"Baga,Goa"},
  {place:"Vagator,Goa"},
  {place:"Anjuna,Goa"},
  {place:"Chapora Fort,Goa"}
];
// View Model
var PlaceViewModel = function() {
  self=this;
  self.placeList=ko.observableArray(places);    //observable array of places
  self.filter = ko.observable("");                //empty obsservable
  self.filteredData = ko.computed(function() {     //getting the list of filtered places
  var filter = self.filter().toLowerCase();
  if (!filter) {
    for(var i=0;i<markers.length;i++)
    {
      markers[i].setMap(map);                //show all markers when there is no text in search box
    }
    return places;                           //return all elements
  } else {

    var filteredArray = ko.utils.arrayFilter(self.placeList(), function(item) {   //filtered list when there is some text in search box
      return item.place.toLowerCase().indexOf(filter) > -1;
    });
    if(filteredArray.length==0)                    //if nothing mathes hide all markers
    {
      for(var i=0;i<markers.length;i++)
      {
        markers[i].setMap(null);
      }
    }

   for(var i=0;i<self.placeList().length;i++)             //display markers for filtered places
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
            j=filteredArray.length;                        //if place found then skip the remaining loop as it will set the map null again
        }
      }
    }

    return filteredArray;

}
});
self.displayInfo = function(value)
{
   console.log(value.place);
   google.maps.event.trigger(value.marker, 'click');   //trigger click on marker if list element is clicked
   console.log("bvsjakjsj");
};

};
ko.applyBindings(new PlaceViewModel());
