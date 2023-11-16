import {
  Icons,
  Switch,
  Table,
  TableBody,
  TableBodyData, TableBodyDataCellTemplate,
  TableBodyDataRowTemplate,
  TableHead,
  TableHeadCell,
  TableHeadRow,
  TableSortingRule,
  tableSortingRuleFieldType,
  TableSortingRules,
  TableWrapper
} from '@utahdts/utah-design-system';
import PropTypes from 'prop-types';
import { useState } from 'react';

const propTypes = {
  tableData: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.bool])),
  type: PropTypes.string.isRequired,
};
const defaultProps = {};
function SubscriptionTable({ tableData, type }) {
  const [data, setData] = useState(tableData);

  return (
    data?.length
      ? (
        <TableWrapper>
          <Table className="table table--lines-x table--alt table--v-align-center">
            <TableHead>
              <TableSortingRules defaultValue="loginName">
                <TableSortingRule a11yLabel="Login Name" recordFieldPath="loginName" />
                <TableSortingRule a11yLabel="Email" recordFieldPath="email" />
                <TableSortingRule a11yLabel="Additional Email" recordFieldPath="additionalEmail" />
                <TableSortingRule a11yLabel="Order Number" recordFieldPath="orderNumber" />
                <TableSortingRule a11yLabel="Effective Date" recordFieldPath="effectiveDate" fieldType={tableSortingRuleFieldType.DATE} />
                <TableSortingRule a11yLabel="Expiration Date" recordFieldPath="expirationDate" fieldType={tableSortingRuleFieldType.DATE} />
              </TableSortingRules>
              <TableHeadRow>
                <TableHeadCell recordFieldPath="loginName">Login Name</TableHeadCell>
                <TableHeadCell recordFieldPath="email">Email</TableHeadCell>
                <TableHeadCell recordFieldPath="additionalEmail">Additional Email</TableHeadCell>
                <TableHeadCell recordFieldPath="orderNumber">Order Number</TableHeadCell>
                <TableHeadCell recordFieldPath="effectiveDate">Effective Date</TableHeadCell>
                <TableHeadCell recordFieldPath="expirationDate">Expiration Date</TableHeadCell>
                { type === 'pending' ? <TableHeadCell recordFieldPath="activated">Action</TableHeadCell> : ''}
              </TableHeadRow>
            </TableHead>
            <TableBody>
              <TableBodyData records={data} recordIdField="subscriptionId">
                <TableBodyDataRowTemplate>
                  <TableBodyDataCellTemplate recordFieldPath="loginName" />
                  <TableBodyDataCellTemplate recordFieldPath="email" />
                  <TableBodyDataCellTemplate recordFieldPath="additionalEmail" />
                  <TableBodyDataCellTemplate recordFieldPath="orderNumber" />
                  <TableBodyDataCellTemplate recordFieldPath="effectiveDate" />
                  <TableBodyDataCellTemplate recordFieldPath="expirationDate" />
                  { type === 'pending'
                    ? (
                      <TableBodyDataCellTemplate>
                        {
                    ({ record }) => (
                      <Switch
                        id={`renew-switch--${record.subscriptionId}`}
                        label="Renew"
                        value={record.activated}
                        onChange={(e) => {
                          e.stopPropagation();
                          setData(data.map((item) => {
                            if (item.subscriptionId === record.subscriptionId) {
                              return { ...item, activated: !record.activated };
                            }
                            return item;
                          }));
                        }}
                        size="medium"
                        width={25}
                        sliderChildren={Icons.IconCheck()}
                      />
                    )
                  }
                      </TableBodyDataCellTemplate>
                  )
                    : ''}
                </TableBodyDataRowTemplate>
              </TableBodyData>
            </TableBody>
          </Table>
        </TableWrapper>
      )
      : <p>No {type} subscriptions...</p>
  );
}

SubscriptionTable.propTypes = propTypes;
SubscriptionTable.defaultProps = defaultProps;

export default SubscriptionTable;
