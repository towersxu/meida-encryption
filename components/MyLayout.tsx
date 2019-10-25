import Header from './Header'

const Layout = (props) => (
  <div>
    <Header />
    <div className="main">
      {props.children}
    </div>
    <style jsx>{`
        .main {
          margin-top: 120px;
        }
    `}</style>
  </div>
)

export default Layout