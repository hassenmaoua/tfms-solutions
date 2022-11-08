import styles from './InvoiceForm.module.css';
import { Select, InputNumber } from 'antd';
const { Option } = Select;

const LivraisonItem = ({
  article,
  produitList,
  onEditQuantiteHandler,
  onEditPrixHandler,
  onDeleteItem,
  onSetItem,
}) => {
  const deleteItemHandler = () => {
    onDeleteItem(article.id);
  };
  if (produitList)
    return (
      <tr>
        <td>
          <Select
            style={{
              width: '100%',
            }}
            id={article.id}
            showSearch
            placeholder='Choisir un produit'
            optionFilterProp='children'
            onChange={(value) => {
              onSetItem(article.id, produitList[value]);
            }}
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
          >
            {produitList.map((item, index) => {
              return (
                <Option key={index} value={item.index}>
                  {item.intitule}
                </Option>
              );
            })}
          </Select>
        </td>
        <td>
          <InputNumber
            style={{
              width: '100%',
              paddingRight: 0,
              paddingLeft: 0,
            }}
            id={article.id}
            min={1}
            max={999}
            name='quantite'
            onChange={(value) => onEditQuantiteHandler(value, article.id)}
            value={article.quantite}
          />
        </td>
        <td>
          <InputNumber
            style={{
              width: '100%',
              align: 'right',
            }}
            id={article.id}
            min={1}
            max={9999999}
            step={0.1}
            onChange={(value) => {
              onEditPrixHandler(value, article.id);
            }}
            value={article.bugetVente}
            name='bugetVente'
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
            }
          />
        </td>
        <td
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <button className={styles.delete} onClick={deleteItemHandler}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              style={{ width: 24, height: 24 }}
              fill='none'
              viewBox='0 2 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
              />
            </svg>
          </button>
        </td>
      </tr>
    );
};

export default LivraisonItem;
