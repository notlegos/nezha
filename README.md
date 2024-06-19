![](https://img.shields.io/badge/Plantfrom-Micro%3Abit-red) ![](https://img.shields.io/travis/com/elecfreaks/pxt-nezha) ![](https://img.shields.io/github/v/release/elecfreaks/pxt-nezha) ![](https://img.shields.io/github/last-commit/elecfreaks/pxt-nezha) ![](https://img.shields.io/github/languages/top/elecfreaks/pxt-nezha) ![](https://img.shields.io/github/issues/elecfreaks/pxt-nezha) ![](https://img.shields.io/github/license/elecfreaks/pxt-nezha) 

# NeZha Package

![](/nezha.png/)

This extension is designed to program and drive the NeZha micro:bit expansion board.

## Code Example
```JavaScript

input.onButtonPressed(Button.A, function () {
    neZha.setMotorSpeed(neZha.MotorList.M1, 100)
    neZha.setMotorSpeed(neZha.MotorList.M2, 100)
    neZha.setMotorSpeed(neZha.MotorList.M3, 100)
    neZha.setMotorSpeed(neZha.MotorList.M4, 100)
})
input.onButtonPressed(Button.B, function () {
    neZha.setServoAngel(neZha.ServoList.S1, 119)
    neZha.setServoSpeed(neZha.ServoList.S2, -58)
})
input.onButtonPressed(Button.AB, function () {
    neZha.stopAllMotor()
})
basic.forever(function () {
	
})

```
## Supported targets

* for PXT/microbit

## License
MIT
