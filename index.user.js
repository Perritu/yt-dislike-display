// ==UserScript==
// @name        Youtube Dislike displayer
// @version     1.0
// @description Just a XD
// @author      perritu
// @match       https://www.youtube.com/*
// @icon        https://www.google.com/s2/favicons?domain=youtube.com
// @grant       none
// @run-at      document-end
// ==/UserScript==

(function(w, d){
  // Name has no relation, just remembered this from an old mmo.
  let drabaki = function(){
    // Let's see if all we need is already defined ;).
    let dive  = 'yt.config_.SBOX_SETTINGS.SEARCHBOX_COMPONENT.__dataHost.parentComponent.__data.data.playerResponse.videoDetails'.split('.')
    let diver = function(pool, oxygen){
      if(0 == oxygen.length) return true

      if(undefined == pool[oxygen[0]]){
        console.info('oxygen stooped en ', oxygen[0])
        return false
      }

      return diver(pool[oxygen[0]], oxygen.slice(1))
    }

    if(!diver(w, dive)) return self.setTimeout(drabaki, 100) // Wait until all my shit is loaded.

    let vidTails        = w.yt.config_.SBOX_SETTINGS.SEARCHBOX_COMPONENT.__dataHost.parentComponent.__data.data.playerResponse.videoDetails
    let likesElement    = d.querySelector('div#top-level-buttons-computed > ytd-toggle-button-renderer:nth-of-type(1) #text')
    let dislikesElement = d.querySelector('div#top-level-buttons-computed > ytd-toggle-button-renderer:nth-of-type(2) #text')

    if(!likesElement || !dislikesElement){
      return self.setTimeout(drabaki, 100)
    }

    let likes       = likesElement.innerText.replaceAll(/[^\d]+/g, '')
    let rating      = vidTails.averageRating
    let dislikes    = Math.round(likes / ((rating -1) /4) - likes).toString()
    let dislikesDec = dislikes.replaceAll(/(\d{3}$)/g, ',$1')

    dislikesElement.innerText = dislikesDec
  }

  // Another reference from the mmo.
  let eltrion = function(){
    // See if we can get the meta.
    let dive  = 'yt.config_.SBOX_SETTINGS.SEARCHBOX_COMPONENT.__dataHost.parentComponent.__data.data.playerResponse.videoDetails.videoId'.split('.')
    let diver = function(pool, oxygen){
      if(0 == oxygen.length) return true

      if(undefined == pool[oxygen[0]]){
        console.info('oxygen stooped en ', oxygen[0])
        return false
      }

      return diver(pool[oxygen[0]], oxygen.slice(1))
    }
    if(!diver(w, dive)) return // Wait for the next loop, we have nothing left here.

    let oldId = w.çÜ || '' // Just something very weird to store this magic string. :D
    let vidId = w.yt.config_.SBOX_SETTINGS.SEARCHBOX_COMPONENT.__dataHost.parentComponent.__data.data.playerResponse.videoDetails.videoId

    if(oldId == vidId) return // Put hand magic. :P

    w.çÜ = vidId // Let's know if this instance have magic. :D
    // Call the corrupted warden of darkness.
    drabaki()
  }

  // Just a watch dog. ^_^
  self.setInterval(eltrion, 1000)
})(window, document)
