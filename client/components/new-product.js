import { Component } from 'react'

export default class NewProduct extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      imageUrl: '',
      description: '',
      rating: 1,
      originCategory: '',
      triggered: false
    }
  }
  render() {
    return (
      <div>
        <form>{//Oh no! Dan interrupted us to make a lecture... oh well.}</form>
      </div>
    )
  }
}
