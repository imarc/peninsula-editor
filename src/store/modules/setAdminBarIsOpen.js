/**
 * @function setAdminBarIsOpen
 * @param Object commit event object for Vuex commit
 * @param Boolean what to set boolean value to for editing
 */

export default function setAdminBarIsOpen (bool) {
  if (bool) {
    document.querySelector('body').classList.add('-editing')
  } else {
    document.querySelector('body').classList.remove('-editing')
  }
  this.setAdminBarIsOpen(bool)
}
