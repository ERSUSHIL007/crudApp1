var app = angular.module("crud-app", []).controller("crudCtrl", ctrl_function);

//Separate Controller function
function ctrl_function($scope, $http) {
    $scope.dbData;
    $scope.in_data1;
    $scope.in_data2;
    $scope.in_data3;
    $scope.temp_1;
    $scope.u_data1;
    $scope.u_data2;
    $scope.u_data3;
    $scope.o_record;
    $scope.n_record;

    //Get the Records 
    $scope.get_Record = function() {
        $http.get("get_records").then(function(dt) {
            alert(dt.data);
            $scope.dbData = dt.data;
        });
    };
    //Insert Records
    $scope.insert_Records = function() {
        var obj_in = { uname: $scope.in_data1, uid: $scope.in_data2, loc: $scope.in_data3 };

        $http.post("insert_data", obj_in).then(function(dt) {
            alert(dt.data);

            $scope.get_Record();
        });

        $scope.in_data1 = "";
        $scope.in_data2 = "";
        $scope.in_data3 = "";
    };
    //To Delete One Record
    $scope.delete_One = function(del_1, del_2, del_3) {
        var del_one = { uname: del_1, uid: del_2, loc: del_3 };
        $scope.temp_1 = confirm("Are You Want To Delete This Record?");

        if ($scope.temp_1) {
            $http.post("delete_oneRecord", del_one).then(function(dt) {
                alert(dt.data);
                $scope.get_Record();
            });
        }
    };
    //To Delete All Records
    $scope.delete_All = function() {
        $scope.temp_1 = confirm("Are You Want To Delete All Records?");

        if ($scope.temp_1) {
            $http.delete("delete_allRecords").then(function(dt) {
                alert(dt.data);
                $scope.get_Record();
            });
        }
    };
    //To Edit Records
    $scope.edit_Records = function(e1_data, e2_data, e3_data) {
        $scope.o_record = { uname: e1_data, uid: e2_data, loc: e3_data };
        $scope.u_data1 = e1_data;
        $scope.u_data2 = e2_data;
        $scope.u_data3 = e3_data;
    };
    //After Editing, Save the Records
    $scope.update_Records = function() {
        n_record = { uname: $scope.u_data1, uid: $scope.u_data2, loc: $scope.u_data3 };

        console.log($scope.o_record);
        console.log($scope.n_record);

        var updated_data = [$scope.o_record, $scope.n_record];

        $http.post("updated_Record", updated_data).then(function(dt) {
            alert(dt.data);

            $scope.get_Record();
        });

        $scope.u_data1 = "";
        $scope.u_data2 = "";
        $scope.u_data3 = "";
    };

};