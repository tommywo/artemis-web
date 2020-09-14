import fetch from 'isomorphic-unfetch';
import useSWR from 'swr';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import BGPTable from './components/BGPTable/BGPTable';

function Overview() {
  const { data, revalidate } = useSWR('/api/me', async function (args) {
    const res = await fetch(args);
    return res.json();
  });

  if (!data) return <h1>Loading...</h1>;
  let loggedIn = false;

  if (data.email) {
    loggedIn = true;
  } else {
    Router.push('/login');
  }
  const Footer = dynamic(() => import('./components/Footer/Footer'));
  const Header = dynamic(() => import('./components/Header/Header'));

  return (
    <>
      <Head>
        <title>ARTEMIS - Overview</title>
      </Head>
      <Header loggedIn={loggedIn}></Header>
      <div className="container overview col-lg-12" style={{ paddingTop: "120px" }}>
        <div className="row">
          <div className="col-lg-1" />
          <div className="col-lg-10">
            <h1 style={{ color: "white" }}>BGP Updates</h1> <hr style={{ backgroundColor: "white" }} />
          </div>
        </div>
        <div className="row" style={{ marginTop: "20px" }}>
          <div className="col-lg-1" />
          <div className="col-lg-10">
            <div className="card">
              <div className="card-header"> </div>
              <div className="card-body">
                <BGPTable />
              </div>
            </div>
          </div>
        </div>
        <div className="row" style={{ marginTop: "20px" }}>
          <div className="col-lg-1" />
          <div className="col-lg-10">
            <div className="card">
              <div className="card-header"> View distinct values </div>
              <div className="card-body">
                <div className="col-lg-3">
                <select className="form-control" id="distinct_values_selection">
                  <option value="select">Select</option>
                  <option value="prefix">Prefix</option>
                  <option value="matched_prefix">Matched Prefix</option>
                  <option value="origin_as">Origin AS</option>
                  <option value="peer_asn">Peer AS</option>
                  <option value="service">Service</option>
                </select>
                </div>
                {/* <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Module</th>
                      <th>Status</th>
                      <th>Uptime</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Clock</td>
                      <td>On</td>
                      <td>8h</td>
                    </tr>
                  </tbody>
                </table> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Overview;