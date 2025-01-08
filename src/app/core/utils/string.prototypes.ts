declare global {
    interface String {
      isNotEmpty(): boolean
      isEmpty(): boolean
      capitalizeFirst(): string
    }
  }
  
  if (!String.prototype.isNotEmpty) {
    String.prototype.isNotEmpty = function () {
      return this && this.length > 0
    }
  }
  
  if (!String.prototype.isEmpty) {
    String.prototype.isEmpty = function () {
      return !this.isNotEmpty()
    }
  }
  
  if (!String.prototype.isEmpty) {
    String.prototype.isEmpty = function () {
      return !this.isNotEmpty()
    }
  }
  
  if (!String.prototype.capitalizeFirst) {
    String.prototype.capitalizeFirst = function () {
      return this.charAt(0).toUpperCase() + this.slice(1)
    }
  }
  
  export {}