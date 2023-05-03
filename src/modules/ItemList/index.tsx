import { useState, FC, useCallback } from "react";
import Checkbox from "@/components/Checkbox"
import Tile from "@/components/Tile";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from 'react-dnd-html5-backend';
import sx from '../../styles/modules.module.scss'

interface DynamicProps {
    [key: string]: string;
}

interface Item {
    id: string;
    title: string;
}

interface IPropsItemList {
    items: Item[];
    selectedItems: string[];
    onItemChange: (id: string) => void
}

const ItemList = ({ tiles, onReorderTiles, onSelectAll, onToggleSelect, allSelected, indeterminate }: any) => {
    const moveTile = (dragId: string, hoverId: string) => {
        onReorderTiles(dragId, hoverId);
    };

    const handleSelectAll = () => {
        onSelectAll();
    };

    const handleToggleSelect = (id: string) => {
        onToggleSelect(id);
    };

    console.log(tiles)

    return (
        <div className={sx["list"]}> 
            <div className={sx["list-select-all"]}>
                <Checkbox checked={allSelected} indeterminate={indeterminate} onChange={handleSelectAll} />
            </div>
            <div className={sx["list-items"]}>
                <DndProvider backend={HTML5Backend}>
                    <ul>
                        {
                            tiles.map((tile: any, index: number) => (
                                <Tile key={tile.id} id={tile.id} title={tile.title} url={tile.url} icon={tile.icon} onMoveTile={moveTile} onToggleSelect={handleToggleSelect} selected={tile.selected}/>
                            ))
                        }
                    </ul>
                </DndProvider>
            </div>
        </div>
    )
}

export default ItemList
