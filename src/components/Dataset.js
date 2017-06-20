import React, { Component } from 'react'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'

const styles = {
  block: {
    maxWidth: 1,
    display: 'flex',
    flexDirection: 'row'
    // color: 'white'
  },
  radio: {
    display: 'flex',
    flexDirection: 'row',
    maxWidth: 0
  }

}

class Dataset extends Component {
  constructor (props) {
    super(props)

    const ratings = []
    for (let yearI = 10; yearI >= 0; yearI--) {
      ratings.push(yearI)
    }

    const years = []
    for (let yearI = new Date().getFullYear(); yearI >= 2000; yearI--) {
      years.push(yearI)
    }
    years.push(0)

    this.state = {
      years,
      ratings,
      yearsClicked: [],
      ratingsClicked: [],
      slider: 5
    }
  }

  render () {
    console.log('years Clicked', this.state.yearsClicked)
    console.log('ratings Clicked', this.state.ratingsClicked)
    return (
      <div>
        <h3>Filters</h3>
        <div style={styles.block}>
          <h4>Year</h4>
          <RadioButtonGroup name='YearsClicked' style={styles.radio} onChange={(e) => this.addClicks(e, 'year')}>
            {this.state.years.map((year, index) => {
              return (
                <RadioButton
                  key={index}
                  value={year}
                  label={year}
                  style={{font: 'white'}}
                />
              )
            })
            }
          </RadioButtonGroup>
        </div>
        <div style={styles.block}>
          <h4>Ratings</h4>
          <RadioButtonGroup name='RatingsClicked' style={styles.block} onChange={(e) => this.addClicks(e, 'rating')}>
            {this.state.ratings.map((rating, index) => {
              return (
                <RadioButton
                  key={index}
                  value={rating}
                  label={rating}
                />
              )
            })
            }
          </RadioButtonGroup>
        </div>
        <div>
          <h4>text filter</h4>
          <input name=" "/>
        </div>
      </div>
    )
  }

  addClicks (event, label) {
    // console.log(event, label, event.target.id, event.target.checked, event.target.value)

    if (label === 'year') {
      this.props.callbackParent(event.target.value, null)
    }

    if (label === 'rating') {
      this.props.callbackParent(null, event.target.value)
    }
    if (label === 'slider') {
      this.props.callbackParent(null, event)
    }
  }
}

Dataset.propTypes = {}
Dataset.defaultProps = {}

export default Dataset
