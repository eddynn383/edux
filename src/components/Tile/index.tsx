import { useDrag, useDrop } from 'react-dnd';
import Checkbox from '../Checkbox';
import { ItemTypes } from './interface';
import sx from '../../styles/modules.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IPropTile {
    item: {
        id: string;
        title: string;
        url: string;
        checked: boolean;
        name: string;
        onChange: (id: string) => void;
    };
    index: number;
    moveCard: (dragIndex: number, hoverIndex: number) => void;
    selected: boolean
}

interface DragItem {
    index: number
    id: string
    type: string
}

const Tile = ({ id, title, url, icon, onMoveTile, onToggleSelect, selected }: any) => {
    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: 'tile',
        item: { id },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    const [, dropRef] = useDrop(() => ({
        accept: 'tile',
        hover: (item: { id: number }) => {
            if (item.id !== id) {
                onMoveTile(item.id, id);
            }
        },
    }));

    const handleSelect = () => {
        onToggleSelect(id);
    };

    return (
        <li style={{ opacity: isDragging ? 0.5 : 1 }} className={sx["list-item"]}>
            <span className={sx["list-item-id"]}>
                <Checkbox checked={selected} indeterminate={false} onChange={handleSelect} />
            </span>
            <span className={sx["list-item-title"]}>{title}</span>
            <span className={sx["list-item-url"]}>{url}</span>
            <span className={sx["list-item-icon"]}>{icon}</span> 
            <span className={sx["list-item-drag"]} ref={(node) => {
                console.log(node)
                dragRef(dropRef(node))
            }}>
                <FontAwesomeIcon icon="grip-vertical" />
            </span>
        </li>
    )
}

export default Tile
