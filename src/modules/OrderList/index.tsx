import { useState, useEffect } from 'react';
import ItemList from '../ItemList';
import { IPropsOrderList } from './interface'

const OrderList = ({theme="light", header, body, loading, onAdd, onEdit, onDelete, onSelectedRowKeysChange}: IPropsOrderList) => {

    const [tiles, setTiles] = useState<any>([]);
    const [allSelected, setAllSelected] = useState<boolean>(false);
    const [indeterminate, setIndeterminate] = useState<boolean>(false);

    useEffect(() => {
        const parentItems = body.filter((item) => !item.parentId);
        setTiles(parentItems)
        console.log(parentItems)
    }, [body]);

    const updateDatabase = async (newOrder: any) => {
        // Implement your API call to update the database with the new order
    };
    
    const handleSelectAll = () => {
        const newState = !allSelected;
        setAllSelected(newState);
        setIndeterminate(false);

        const newTiles = tiles.map((tile: any) => ({
            ...tile,
            selected: newState,
        }));

        setTiles(newTiles);
    };

    const handleToggleSelect = (id: string) => {
        const newTiles = tiles.map((tile: any) =>
            tile.id === id ? { ...tile, selected: !tile.selected } : tile
        );
        setTiles(newTiles);

        const selectedCount = newTiles.filter((tile: any) => tile.selected).length;
        setIndeterminate(selectedCount > 0 && selectedCount < newTiles.length);
        setAllSelected(selectedCount === newTiles.length);
    };

    return (
        <ItemList
            data={tiles}
            onSelectAll={handleSelectAll}
            onToggleSelect={handleToggleSelect}
            allSelected={allSelected}
            indeterminate={indeterminate}
      />
    )
}

export default OrderList
