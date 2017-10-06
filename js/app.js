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
    if(filteredArray.length===0)                    //if nothing mathes hide all markers
    {
      for(var p=0;p<markers.length;p++)
      {
        markers[p].setMap(null);
      }
    }

   for(var q=0;q<self.placeList().length;q++)             //display markers for filtered places
    {
      for(var j=0;j<filteredArray.length;j++)
      {
        if(self.placeList()[q]!=filteredArray[j])
        {
          markers[q].setMap(null);
        }
        else
        {
            markers[q].setMap(map);
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
