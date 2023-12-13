import {memo} from "react";
import PropTypes from 'prop-types';
import './style.css';
import useSelector from "../../hooks/use-selector";

function SelectFilter(props) {

  const filters = useSelector(state => state.catalog.filters)

  const getOptions = (filter, prefix = '') => {
    if (!filter.children) {
      return (<option key={filter._id} value={filter._id}>{prefix}{filter.title}</option>);
    } else {
      return [
        (<option key={filter._id} value={filter._id}>{prefix}{filter.title}</option>),
        filter.children.map((childFilter) => getOptions(childFilter, prefix + '- '))
      ]
    }
  }

  const onSelect = (e) => {
    props.onChange(e.target.value);
  };

  return (
    <select className="Select" value={props.filter} onChange={onSelect}>
      <option value={''}>Все</option>
      {filters.map((filter) => getOptions(filter))}
    </select>
  )
}

export default memo(SelectFilter);
