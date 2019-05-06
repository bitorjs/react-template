import React, { Component, useState, useRef } from 'react'
import PageContainer from '../components/page-container';
import PageRootContainer from '../components/page-root-container';

import './styles/order.less'

// export default function (props) {

//   const ref = useRef()

//   const [state, setState] = useState({
//     list: [
//       { name: "A", id: 1 },
//       { name: "B", id: 2 },
//       { name: "C", id: 3 },
//       { name: "D", id: 4 }
//     ]
//   });

//   return (
//     <PageRootContainer>
//       <PageContainer>
//         <div className="order-list">
//           {
//             state.list.map((data, index) => {
//               return (
//                 <div className="item" key={data.id}>
//                   <p onClick={() => { ref.redirect('/order/detail/' + data.id) }}>{data.name}</p>
//                 </div>
//               )
//             })
//           }
//         </div>
//       </PageContainer>
//     </PageRootContainer>
//   )
// }

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        { name: "A", id: 1 },
        { name: "B", id: 2 },
        { name: "C", id: 3 },
        { name: "D", id: 4 }
      ]
    }
  }

  render() {
    return (
      <PageRootContainer>
        <PageContainer>
          <div className="order-list">
            {
              this.state.list.map((data, index) => {
                return (
                  <div className="item" key={data.id}>
                    <p onClick={() => { this.redirect('/order/detail/' + data.id) }}>{data.name}</p>
                  </div>
                )
              })
            }
          </div>
        </PageContainer>
      </PageRootContainer>
    )
  }
}