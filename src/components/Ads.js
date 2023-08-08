import { useEffect } from "react"

function Ads() {

    useEffect(() => {
        const pushAd = () => {
          try {
            const adsbygoogle = window.adsbygoogle
            // console.log({ adsbygoogle })
            adsbygoogle.push({})
          } catch (e) {
            console.error(e)
          }
        }
    
        let interval = setInterval(() => {
          // Check if Adsense script is loaded every 300ms
          if (window.adsbygoogle) {
            pushAd()
            // clear the interval once the ad is pushed so that function isn't called indefinitely
            clearInterval(interval)
          }
        }, 300)
    
        return () => {
          clearInterval(interval)
        }
      }, [])
      return (
        <ins
            className='adsbygoogle'
            style={{ display: 'block' }}
            data-ad-client="ca-pub-9356255861564093"
            data-ad-slot="1836512304"
            data-ad-format="auto"
            data-full-width-responsive='true'
        ></ins>
      )
}

export default Ads;