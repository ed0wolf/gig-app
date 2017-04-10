import React from 'react';
import {getGigsFiltersForArtist} from '../stores/gigStore';
import Select from 'react-select';

import 'react-select/dist/react-select.css';

export default class GigsFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filtersLoaded: false,
            possibleCountries: [],
            possibleYears: [],
            selectedCountry: null,
            selectedYear: null
        }
    }
    
    componentDidMount() {
        var self = this;
        getGigsFiltersForArtist(self.props.artistId).then(response => {
            self.setState({
                filtersLoaded: true,
                possibleCountries: response.data.countries,
                possibleYears: response.data.years
            });
        });
    }

    render() {
        var self = this;
        if(!self.state.filtersLoaded) {
            return (<div>Loading filters</div>);
        }
        
        var countryOptions = self.mapValuesToSelectOptions(self.state.possibleCountries);
        var yearOptions = self.mapValuesToSelectOptions(self.state.possibleYears);

        return (
            <form>
                <Select name="gigs-country-filter" placeholder="Filter by Country" value={self.state.selectedCountry} options={countryOptions} onChange={(val) => self.setState({ selectedCountry: val})} />
                <Select name="gigs-year-filter" placeholder="Filter by Year" value={self.state.selectedYear} options={yearOptions} onChange={(val) => self.setState({ selectedYear: val})} /> 
                    <div>Gigs will show here ....</div>
            </form>
        );
    }

    mapValuesToSelectOptions(values) {
        return values.map(x => { return { value: x, label: x }; });
    }
}