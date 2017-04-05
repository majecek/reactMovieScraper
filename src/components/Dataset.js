import React, { Component } from 'react'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import _ from 'lodash'
import Slider from 'material-ui/Slider';


const styles = {
  block: {
    maxWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    // color: 'white'
  },

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
          <RadioButtonGroup name="YearsClicked" style={styles.block} onChange={(e) => this.addClicks(e, 'year')}>
            {this.state.years.map(year => {
              return (
                <RadioButton
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
          <RadioButtonGroup name="RatingsClicked" style={styles.block} onChange={(e) => this.addClicks(e, 'rating')}>
            {this.state.ratings.map(rating => {
              return (
                <RadioButton
                  value={rating}
                  label={rating}
                />
              )
            })
            }
          </RadioButtonGroup>
        </div>
        {/*<div>*/}
          {/*<Slider*/}
            {/*axis="x-reverse"*/}
            {/*min={0}*/}
            {/*max={10}*/}
            {/*step={0.1}*/}
            {/*defaultValue={5}*/}
            {/*value={this.state.slider}*/}
            {/*onChange={(e) => this.handleSlider(e, this.state.slider,'slider')}*/}
          {/*/>*/}
          {/*<p>*/}
            {/*<span>{'The value of this slider is: '}</span>*/}
            {/*<span>{this.state.secondSlider}</span>*/}
            {/*<span>{' from a range of 0 to 100 inclusive'}</span>*/}
          {/*</p>*/}
        {/*</div>*/}
      </div>
    )
  }

  handleSlider = (event, value, label) => {
    // console.log(event,value, label)
    this.setState({slider: value});
    this.addClicks(value, label)
  }

  addClicks (event, label) {
    // console.log(event, label, event.target.id, event.target.checked, event.target.value)

    if (label === 'year') {
      this.props.callbackParent(event.target.value,null)
    }

    if (label === 'rating') {
      this.props.callbackParent(null,event.target.value)
    }
    if (label === 'slider') {
      this.props.callbackParent(null,event)
    }
  }
}

Dataset.propTypes = {}
Dataset.defaultProps = {}

export default Dataset
