import { useState, useEffect, FC, useCallback } from "react";
import Checkbox from "@/components/Checkbox"
import Tile from "@/components/Tile";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper'
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

const ItemList = ({ data, onSelectAll, onToggleSelect, allSelected, indeterminate }: any) => {
    const [tiles, setTiles] = useState(data);

    useEffect(() => {
        setTiles(data)
    }, [data])
    console.log(data)

    const findTile = useCallback((id: string) => {
            const tile = tiles.filter((item: any) => item.id === id)[0];
            return {
                tile,
                index: tiles.indexOf(tile),
            };
        },
        [tiles]
    );

    const moveTile = useCallback((id: string, atIndex: any) => {
        const { tile, index } = findTile(id);
        setTiles(update(tiles, {
                $splice: [
                    [index, 1],
                    [atIndex, 0, tile],
                ],
            })
        );
    },
        [findTile, tiles, setTiles]
    );

    const handleSelectAll = () => {
        onSelectAll();
    };

    const handleToggleSelect = (id: string) => {
        onToggleSelect(id);
    };

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
                                <Tile key={tile.id} id={tile.id} title={tile.title} url={tile.url} icon={tile.icon} onMoveTile={moveTile} onToggleSelect={handleToggleSelect} selected={tile.selected} findTile={findTile} />
                            ))
                        }
                    </ul>
                </DndProvider>
            </div>
        </div>
    )
}

export default ItemList
