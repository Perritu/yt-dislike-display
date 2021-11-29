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
    let dive = 'yt.config_.SBOX_SETTINGS.SEARCHBOX_COMPONENT.__dataHost.parentComponent.__data.data.playerResponse.videoDetails'.split('.')
    let diver = function(pool, oxygen){
      if(0 == oxygen.length) return true

      if(undefined == pool[oxygen[0]]){
        console.info('oxygen stooped en ', oxygen[0])
        return false
      }

      return diver(pool[oxygen[0]], oxygen.slice(1))
    }

    if(!diver(w, dive)) return self.setTimeout(drabaki, 100) // Wait until all my shit is loaded.

    let vidTails = w.yt.config_.SBOX_SETTINGS.SEARCHBOX_COMPONENT.__dataHost.parentComponent.__data.data.playerResponse.videoDetails
    let rating = vidTails.averageRating
    let likes = parseInt(d.querySelector('yt-formatted-string[aria-label]#text').innerText.replaceAll(/[^\d]+/g, ''))
    let dislikes = Math.round(likes / ((rating -1) /4) - likes).toString()
    let dislikesDec = dislikes.replaceAll(/(\d{3}$)/g, ',$1')

    let dislikeElem = d.querySelector('div#top-level-buttons-computed > ytd-toggle-button-renderer:nth-of-type(2) #text')

    if(dislikeElem){
      dislikeElem.innerText = dislikesDec
    } else {
      self.setTimeout(drabaki, 100) // Here we go again.
    }
  }

  drabaki()
})(window, document)
