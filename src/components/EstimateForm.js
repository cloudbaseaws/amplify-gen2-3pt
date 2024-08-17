import { useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import * as mutations from './graphql/mutations';

const EstimateForm = () => {
  const [formState, setFormState] = useState({
    optimistic: '',
    mostLikely: '',
    pessimistic: '',
  });

  const handleChange = (event) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
    try {
      const { data } = await API.graphql(
        graphqlOperation(mutations.createEstimate, {
          input: formState,
        })
      );
      console.log('Estimate created:', data);
      // Clear form or display success message
    } catch (error) {
      console.error('Error creating estimate:', error);
      // Handle error, e.g., display error message
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        name="optimistic"
        placeholder="Optimistic estimate"
        value={formState.optimistic}
        onChange={handleChange}
      />
      <input
        type="number"
        name="mostLikely"
        placeholder="Most likely estimate"
        value={formState.mostLikely}
        onChange={handleChange}
      />
      <input
        type="number"
        name="pessimistic"
        placeholder="Pessimistic estimate"
        value={formState.pessimistic}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default EstimateForm;