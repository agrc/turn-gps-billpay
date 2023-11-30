/* eslint-disable no-unused-vars */
import {
  Spinner,
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
import { useEffect } from 'react';

const propTypes = {
  tableData: PropTypes.arrayOf(
    PropTypes.shape({
      subscriptionId: PropTypes.number,
      loginName: PropTypes.string,
      email: PropTypes.string,
      additionalEmail: PropTypes.string,
      effectiveDate: PropTypes.string,
      expirationDate: PropTypes.string,
      orderNumber: PropTypes.string,
      activated: PropTypes.bool,
    })
),
  setTableData: PropTypes.func,
  lookupStatus: PropTypes.string,
  type: PropTypes.string,
};
const defaultProps = {};
function SubscriptionTable({
 tableData, setTableData, lookupStatus, type,
}) {
  useEffect(() => {
    setTableData(tableData);
  }, [tableData]);

  const mainTable = () => (
    <TableWrapper>
      <Table className="table table--subscriptions table--lines-x table--alt table--v-align-center full-width">
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
            {type === 'pending' ? <TableHeadCell recordFieldPath="activated">Action</TableHeadCell> : ''}
          </TableHeadRow>
        </TableHead>
        <TableBody>
          <TableBodyData records={tableData} recordIdField="subscriptionId">
            <TableBodyDataRowTemplate>
              <TableBodyDataCellTemplate recordFieldPath="loginName" />
              <TableBodyDataCellTemplate recordFieldPath="email" />
              <TableBodyDataCellTemplate recordFieldPath="additionalEmail" />
              <TableBodyDataCellTemplate recordFieldPath="orderNumber" />
              <TableBodyDataCellTemplate recordFieldPath="effectiveDate" />
              <TableBodyDataCellTemplate recordFieldPath="expirationDate" />
              {type === 'pending'
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
                            setTableData(tableData.map((item) => {
                              if (item.subscriptionId === record.subscriptionId) {
                                return { ...item, activated: !record.activated };
                              }
                              return item;
                            }));
                          }}
                          size="medium"
                          width={25}
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
);

    switch (lookupStatus) {
      case 'fetching': return <Spinner />;
      default: return (
        tableData?.length
          ? (
            mainTable()
          )
          : <p>No {type} subscriptions...</p>
      );
    }
}

SubscriptionTable.propTypes = propTypes;
SubscriptionTable.defaultProps = defaultProps;

export default SubscriptionTable;
