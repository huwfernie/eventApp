angular
  .module('eventApp')
  .controller('EventsIndexCtrl', EventsIndexCtrl)
  .controller('EventsNewCtrl', EventsNewCtrl)
  .controller('EventsShowCtrl', EventsShowCtrl)
  .controller('EventsSearchCtrl', EventsSearchCtrl)
  .controller('EventsEditCtrl', EventsEditCtrl);

EventsIndexCtrl.$inject = ['Event'];
function EventsIndexCtrl(Event) {
  const vm = this;

  vm.all = Event.query();


}

EventsNewCtrl.$inject = ['Event', '$state'];
function EventsNewCtrl(Event, $state) {
  const vm = this;
  vm.event = {};

  function eventsCreate() {
    Event
      .save(vm.event)
      .$promise
      .then(() => $state.go('eventsIndex'));
  }

  vm.create = eventsCreate;
}

EventsShowCtrl.$inject = ['Event', '$stateParams', '$state'];
function EventsShowCtrl(Event, $stateParams, $state) {
  const vm = this;

  vm.event = Event.get($stateParams);

  function eventsDelete() {
    vm.event
      .$remove()
      .then(() => $state.go('eventsIndex'));
  }

  vm.delete = eventsDelete;
}

EventsSearchCtrl.$inject = ['Event', '$stateParams', '$state', '$http'];
function EventsSearchCtrl(Event, $stateParams, $state, $http) {
  const vm = this;

  // for inital manualSearch() setup
  vm.lat = 51.566686;
  vm.long = -0.091324;
  vm.limit = 10;
  vm.distance = 500;
  vm.search_results = null;

  // for content Tabs:
  vm.activeTab = null;
  changeTab(1);

  function getLocation(options) {
    // used by nearMeNow
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  }

  function useData(data){
    // used by nearMeNow
    console.log('data');
    vm.long = data.coords.longitude;
    return vm.lat = data.coords.latitude;
  }

  function nearMeNow() {
    // use HTML 5 geo location, then call manualSearch with location result
    getLocation()
    .then((position) => {
      console.log(position);
      useData(position);
      return manualSearch();
    })
    .catch((err) => {
      return console.error(err.message);
    });
  }
  vm.nearMeNow = nearMeNow;

  function manualSearch() {
    // search the database with manual inputs
    console.log('manualSearch');
    $http({
      url: 'http://localhost:7000/api/eventsSearch',
      method: 'GET',
      params: {longitude: vm.long, latitude: vm.lat, limit: vm.limit, distance: vm.distance }
    })
    .then((data)=> {
      vm.search_results = data.data;
    });
  }
  vm.manualSearch = manualSearch;

  function clearResults() {
    // for clearing search results from display
    console.log('clearResults');
    vm.search_results = null;
  }
  vm.clearResults = clearResults;


  function changeTab(x) {
    // for changing Tab in tabbed browsing
    const allTabs = document.getElementsByClassName('tabs');
    const allContent = document.getElementsByClassName('tab_content');
    if(vm.activeTab !== x) {
      vm.activeTab = x;
      for(let i = 0; i < allTabs.length; i++) {
        allTabs[i].classList.toggle('active');
      }
      for(let i = 0; i < allContent.length; i++) {
        allContent[i].classList.toggle('none');
      }
      // allTabs[x-1].classList.add('active');
    }
  }
  vm.changeTab = changeTab;

}

EventsEditCtrl.$inject = ['Event', '$stateParams', '$state'];
function EventsEditCtrl(Event, $stateParams, $state) {
  const vm = this;

  vm.event = Event.get($stateParams);

  function eventsUpdate() {
    vm.event
      .$update()
      .then(() => $state.go('eventsShow', $stateParams));
  }

  vm.update = eventsUpdate;
}
