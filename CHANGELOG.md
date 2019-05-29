# myuw-search versions

## 1.3.1

* Added more components to local demo to test mobile search positioning 

## 1.3.0

* Added `myuw-search` CustomEvent that exposes the value in the search field when a search is submitted

## 1.2.4

* Added CSS variable to explicitly set mobile search bar origin position (sets the value of `right`).

## 1.2.3

### Added 

* Responsive theming support

## 1.1.9

### Added

* Now supports setting the `--myuw-search-border` CSS variable to better support theming.

## Changed

* Give search toggle button a margin when form is expanded.

## 1.1.8

This patch adds attribute mirroring so that changes to observed attributes that occur _after_ the initial load are correctly reflected in the component.