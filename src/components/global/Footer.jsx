import React from 'react'
import * as icon from 'react-bootstrap-icons';

export default function Footer() {

    return (
        <footer id='contact'>

            <div className="links">
                <a className='link' href="mailto:firzasi.fi@gmail.com">
                    <icon.Envelope />
                </a>

                <a className='link' href="http://wa.me/08160249304">
                    <icon.Whatsapp />
                </a>

                <a className='link' href="tel:+2348160249304">
                    <icon.Phone />
                </a>

            </div>
            <hr />
            <div className="copy">
                &copy; Firdaws.io 2024. All rights Reserved
            </div>
        </footer>
    )
}
