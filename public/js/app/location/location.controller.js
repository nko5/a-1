export default function($scope, $location, $timeout) {
    var vm = this;
    var timeout;

    vm.keywords = '';

    $scope.$watch('vm.keywords', onKeywordEntry);

    function onKeywordEntry() {
        if (timeout) {
            $timeout.cancel(timeout);
        }
        timeout = $timeout(runSearch, 300);
    }

    function runSearch() {
        timeout = null;
        console.log('run search now...');
    }
}
