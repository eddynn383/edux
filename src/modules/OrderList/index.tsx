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
    }, [body]);

    const updateDatabase = async (newOrder: any) => {
        // Implement your API call to update the database with the new order
    };

    const handleReorderTiles = (dragId: string, hoverId: string) => {
        const dragIndex = tiles.findIndex((tile: any) => tile.id === dragId);
        const hoverIndex = tiles.findIndex((tile: any) => tile.id === hoverId);

        const newTiles = [...tiles];
        const removed = newTiles.splice(dragIndex, 1)[0];
        newTiles.splice(hoverIndex, 0, removed);

        setTiles(newTiles);
        updateDatabase(newTiles);
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
            tiles={tiles}
            onReorderTiles={handleReorderTiles}
            onSelectAll={handleSelectAll}
            onToggleSelect={handleToggleSelect}
            allSelected={allSelected}
            indeterminate={indeterminate}
      />
    )
}

export default OrderList
