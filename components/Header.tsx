import Link from 'next/link'
import Logo from './Logo'

const Header = () => (
  <div className="header">
    <Logo activeClassName="logo" />
    <div className="links">
      <Link href="/">
        <a>AUDIO ENCRYPTION</a>
      </Link>
      <Link href="/about">
        <a>WEBRTC ENCRYPTION</a>
      </Link>
      <Link href="/upload">
        <a>ABOUT ME</a>
      </Link>
    </div>
    <style jsx>{`
      .header {
        position: fixed;
        display: flex;
        top: 0;
        width: 100%;
        z-index: 999;
      }
      .links {
        align-self: center;
        flex-grow: 1;
        text-align: right;~
      }
      .links a {
        text-decoration: none;
        color: #333;
        margin: 10px 20px;
        justify-content: flex-end;
        align-self: center;
      }
      .header :global(.logo) {
        flex-grow: 0;
      }
    `}</style>
  </div>
)

export default Header

  // < style jsx> {`
  //     h1, a {
  //       font-family: "Arial";
  //     }

  //     ul {
  //       padding: 0;
  //     }

  //     li {
  //       list-style: none;
  //       margin: 5px 0;
  //     }

  //     a {
  //       text-decoration: none;
  //       color: blue;
  //     }

  //     a:hover {
  //       opacity: 0.6;
  //     }
  //   `}</style >
