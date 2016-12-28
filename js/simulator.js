var simulator = angular.module("simulator", []);

simulator.controller('ctrlSimulator', ['$scope',"$interval", function($scope, $interval) {
    $scope.inputCode = ".-..-";
    $scope.outputCode = "";
    $scope.counter = 0;

    $scope.$watch("inputCode", function(morseCode) {
        $scope.outputCode = translate(morseCode);
    });

    var canvas = document.getElementById("morseTree");

    var ctx = canvas.getContext("2d");
    var imgTree = new Image();
    imgTree.src = "img/Morse_code_tree3.png";    
    canvas.width = 1100;
    canvas.height = 500;
    $scope.x = 500;
    $scope.y = 45;
    $scope.radio = 36;

    $scope.simulation = function() {
        ctx.drawImage(imgTree, 0, 0);
        var coordinate = {
            x: 500,
            y: 45,
            radio: 36
        };

        ctx.beginPath();
        ctx.arc(coordinate.x, coordinate.y, coordinate.radio, 0, 2 * Math.PI, false);
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#22e222';
        ctx.stroke();

        $scope.counter = 0;
        $scope.morseCode = $scope.inputCode.split("");
        if (_t_)
            clearTimeout(_t_);

        var prevX = coordinate.x;
        var _t_ = $interval(function() {
            coordinate = getCoordinate($scope.counter + 1, $scope.morseCode[$scope.counter]);
            
            ctx.beginPath();
            ctx.arc(prevX + coordinate.x, coordinate.y, coordinate.radio, 0, 2 * Math.PI, false);
            ctx.lineWidth = 4;
            if($scope.counter < $scope.morseCode.length-1)
            	ctx.strokeStyle = '#22e222';
            else
            	ctx.strokeStyle = '#FF0000';
			
			$scope.counter++;
            ctx.stroke();

            prevX = prevX + coordinate.x;

            if ($scope.counter >= $scope.morseCode.length || $scope.counter>6) {
                $interval.cancel(_t_);
            }
        }, 1000,0);
    };

    imgTree.onload = function() {
        ctx.drawImage(imgTree, 0, 0);
    };
    ctx.drawImage(imgTree, 0, 0);
    // $scope.$watchGroup(["x","y","radio"],$scope.simulation);

    $scope.isValidCode = function(event) {
        var keyCode = event.keyCode || event.which;
        var keyAllowed = [13, 8, 116, 36, 35, 37, 39, 38, 40];

        if (keyAllowed.indexOf(keyCode) === -1 && event.key !== "-" && event.key !== "." && event.key !== "|" && !isCopy_Paste(event)) {
            event.preventDefault();
        }
    }
}]);

function getCoordinate(level, code) {
    var coordinate = {
        x: 0,
        y: 0,
        radio: 10
    };

    switch (level) {
        case 1:
            if (code === "-")
                coordinate.x = 250;
            else
                coordinate.x = -250;

            coordinate.y = 80;
            break;
        case 2:
            if (code === "-")
                coordinate.x = 125;
            else
                coordinate.x = -125;

            coordinate.y = 125;
            break;
        case 3:
            if (code === "-")
                coordinate.x = 62;
            else
                coordinate.x = -63;

            coordinate.y = 174;
            break;
        case 4:
            if (code === "-")
                coordinate.x = 32;
            else
                coordinate.x = -31;

            coordinate.y = 223;
            break;
        case 5:
            if (code === "-")
                coordinate.x = 14;
            else
                coordinate.x = -14;

            coordinate.y = 268;
            break;
        case 6:
            if (code === "-")
                coordinate.x = 7;
            else
                coordinate.x = -7;

            coordinate.y = 304;
            coordinate.radio=7;
            break;
    }

    return coordinate;
}
