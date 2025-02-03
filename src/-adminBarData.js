/**
 * Data-state for top level AdminBar Instance
 *
 * Copyright 2019, Imarc Agency, All rights reserved.
 * Authors: Tristan Norton
 *
 */

export default {
  isMacOS: navigator.userAgentData?.platform === 'macOS' || /Mac/.test(navigator.userAgent),
}
