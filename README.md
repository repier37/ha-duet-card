# Duet 3D Card
## Home Asssistant card for duet 3D printers (via duet integration)
This card has been taken from https://github.com/dangreco/threedy and has been made compatible with the duet integration. Most of the work has not been done by me.

![Featured](https://github.com/repier37/ha-duet-card/raw/master/screenshots/active.png)

# Table of Contents
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Config](#config)
- [Example Config](#example-config)
- [Custom Theming](#custom-theming)
- [Limitations](#limitations)
- [Screenshots](#screenshots)
  - [Active Print](#active-print)
  - [Idle](#idle)
  - [Printer Offline](#printer-offline)
  - [Show/Hide Animation](#showhide-animation)

## Features
---

- Live animation of 3D printer
- Live camera view
- Current states of various duet sensors
- Tap to show/hide when printer is idle
- Power button for a switch entity
- Light button for a switch entity
- Adjustable 3D printer graphic scale
- Themes


## Prerequisites
---
- [Duet](https://www.duet3d.com/)- 3d printer with duet card
- [Home Assistant](https://www.home-assistant.io/) instance
- Home Assistant [Duet integration](https://github.com/Lyr3x/hass-Duet3D)


## Installation
---
1. [![image](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=repier37&repository=ha-duet-card&category=lovelace)
2. Click the Install Button on the highlighted Card titled _duet_

## Config
---
![graphical](https://github.com/repier37/ha-duet-card/raw/master/screenshots/graphical.png)

## Example Config
---

```yaml
# required
type: 'custom:threedy-card'
base_entity: 'sensor.ender_3_v2'
name: 'Ender 3 v2'
printer_type: I3
monitored:
  - Status
  - ETA
  - Elapsed
  - Remaining
  - Hotend
  - Bed
# optionals  
theme: 'Default'
font: 'Roboto'
scale: 1.0
round: false 
always_show: true
```

## Custom Theming
---

Custom theming can be accomplished using [lovelace-card-mod](https://github.com/thomasloven/lovelace-card-mod#mod-card)'s ```mod-card```.
Some styles may require the css keyword ``` !important``` to override the inline style.
Example usage as follows:

```yaml
type: 'custom:mod-card'
style: |
  threedy-card > div {
    box-shadow: none !important;
  }
card:
  type: 'custom:threedy-card'
    .
    .
    .
    <card config>
```
## Limitations
For the moment only the first tool of your printer can be displayed

## Thank you !!
If you found this useful you can thank me via donation :
[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/donate?hosted_button_id=GR74XEN538Y7L)

## Screenshots
---

### Active Print

![Active](https://github.com/repier37/ha-duet-card/raw/master/screenshots/active.png)

### Idle

![Idle](https://github.com/repier37/ha-duet-card/raw/master/screenshots/idle.png)

### Printer Offline

![Offline](https://github.com/repier37/ha-duet-card/raw/master/screenshots/offline.png)

### Show/Hide Animation

![ShowHide](https://media.giphy.com/media/14VgtFSulJkOaRiZFo/giphy.gif)



