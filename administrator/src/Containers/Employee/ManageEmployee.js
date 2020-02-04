import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { PaperBoard } from '../../Components/PaperBoard/PaperBoard';

export default class ManageEmployee extends Component {
   constructor() {
      super();
      this.state = {
         columns: [
            { title: 'Name', field: 'name' },
            { title: 'Surname', field: 'surname' },
            { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
            {
               title: 'Birth Place',
               field: 'birthCity',
               lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' }
            }
         ],
         data: [
            {
               name: 'Mehmet',
               surname: 'Baran',
               birthYear: 1987,
               birthCity: 63
            },
            {
               name: 'Zerya Betül',
               surname: 'Baran',
               birthYear: 2017,
               birthCity: 34
            }
         ]
      };
   }
   render() {
      return (
         <PaperBoard>
            <MaterialTable
               title='Manage Employee'
               columns={this.state.columns}
               data={this.state.data}
               style={{ width: '90%' }}
            />
         </PaperBoard>
      );
   }
}
