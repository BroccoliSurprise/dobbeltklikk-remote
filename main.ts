/**
 * Dette er en fjernkontroll til BitBot, som kan sende dobbeltklikk-signaler.
 */
control.onEvent(EventBusSource.MICROBIT_ID_BUTTON_A, EventBusValue.MICROBIT_BUTTON_EVT_UP, function () {
    radio.sendString("oppA")
    led.stopAnimation()
    led.plot(0, 2)
})
control.onEvent(EventBusSource.MICROBIT_ID_BUTTON_B, EventBusValue.MICROBIT_BUTTON_EVT_CLICK, function () {
    if (clickTimer != 0) {
        if (input.runningTime() < clickTimer + clickThreshold) {
            radio.sendString("dobbelKlikkB")
            led.stopAnimation()
            led.plot(4, 0)
        }
    } else {
        clickTimer = input.runningTime()
        led.stopAnimation()
    }
})
// Starter en timer når knapp A klikkes. ForAlltidLøkken til høyre stopper klokken etter clickThreshold millisekund. Hvis knapp A klikkes før tiden er ute, skjer noe.
control.onEvent(EventBusSource.MICROBIT_ID_BUTTON_A, EventBusValue.MICROBIT_BUTTON_EVT_CLICK, function () {
    if (clickTimer != 0) {
        if (input.runningTime() < clickTimer + clickThreshold) {
            radio.sendString("dobbelKlikkA")
            led.stopAnimation()
            led.plot(0, 0)
        }
    } else {
        clickTimer = input.runningTime()
        led.stopAnimation()
    }
})
control.onEvent(EventBusSource.MICROBIT_ID_BUTTON_A, EventBusValue.MICROBIT_BUTTON_EVT_DOWN, function () {
    radio.sendString("nedA")
    led.stopAnimation()
    led.plot(0, 4)
})
control.onEvent(EventBusSource.MICROBIT_ID_BUTTON_B, EventBusValue.MICROBIT_BUTTON_EVT_UP, function () {
    radio.sendString("oppB")
    led.stopAnimation()
    led.plot(4, 2)
})
input.onGesture(Gesture.Shake, function () {
    radio.sendString("rist")
    led.stopAnimation()
    led.plot(2, 4)
})
control.onEvent(EventBusSource.MICROBIT_ID_BUTTON_B, EventBusValue.MICROBIT_BUTTON_EVT_DOWN, function () {
    radio.sendString("nedB")
    led.stopAnimation()
    led.plot(4, 4)
})
let clickThreshold = 0
let clickTimer = 0
radio.setGroup(8)
basic.showNumber(8)
clickTimer = 0
clickThreshold = 250
basic.clearScreen()
led.plot(2, 2)
// Timerloop for dobbeltklikking
basic.forever(function () {
    if (clickTimer != 0) {
        if (input.runningTime() > clickTimer + clickThreshold) {
            clickTimer = 0
        }
    }
})
