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
  vm.lat = 51.566686;
  vm.long = -0.091324;
  vm.limit = 10;
  vm.distance = 500;
  vm.data = null;

  function getLocation(options) {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  }

  function useData(data){
    console.log('data');
    vm.long = data.coords.longitude;
    return vm.lat = data.coords.latitude;
  }

  vm.nearMeNow = nearMeNow;
  function nearMeNow() {
    getLocation()
    .then((position) => {
      console.log(position);
      useData(position);
      return sploosh();
    })
    .catch((err) => {
      return console.error(err.message);
    });
  }


  function sploosh() {
    console.log('hello');
    $http({
      url: 'http://localhost:7000/api/eventsSearch',
      method: 'GET',
      params: {longitude: vm.long, latitude: vm.lat, limit: vm.limit, distance: vm.distance }
    })
    .then((data)=> {
      vm.data = data.data;
    });
  }
  vm.sploosh = sploosh;

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
