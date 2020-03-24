import React from 'react';
import { animals, colors } from './constants'
require("./animal.css");

const Animal = ({ name, color, size, rounded, square, circle, dance }) => {
    //validation functions
    const validateName = () => {
        if (name) {
            const lower = name.toLowerCase();
            if (animals.includes(lower)) {
                return lower;
            }
            console.error(
                `InvalidAnimal: '${name}' is not a valid animal name. Using random animal instead.`
            );
        }
        return animals[Math.random() * animals.length << 0];
    }

    const getAvatar = (avatarName) => {
        return require(`./animals/${avatarName}.png`).default
    }

    const validateColor = () => {
        if (color) {
            const lower = color.toLowerCase();
            if (lower in colors) {
                return colors[lower];
            } else if (lower === "none") {
                return "transparent";
            } else if (/^#[0-9A-F]{6}$/i.test(lower)) {
                return lower;
            } else {
                console.error(
                    `InvalidColor: '${color}' is not a valid color. Using random color instead.`
                );
            }
        }
        const keys = Object.keys(colors);
        return colors[keys[(keys.length * Math.random()) << 0]];
    }

    const validateSize = () => {
        if (size) {
            if (
                size.match(
                    /(^\d*)(em|ex|%|px|cm|mm|in|pt|pc|ch|rem|vh|vw|vmin|vmax)/
                )
            ) {
                return size;
            } else {
                console.error(
                    `InvalidSize: '${size}' is not a valid CSS width property. Using '70px' instead.`
                );
            }
        }
        return "70px";
    }

    const borderRadius = () => {
        if (rounded) {
            return "10%";
        } else if (square) {
            return "0px";
        }
        return "50%";
    }

    let avatarName = validateName();
    let avatarImage = getAvatar(avatarName);
    let avatarColor = validateColor();
    let avatarSize = validateSize();

    let avatarStyle = {
        "--a-bg-color": avatarColor,
        "--a-size": avatarSize,
        "--a-border-radius": borderRadius()
    };

    let conditionalClass = dance ? "v-animal-image v-animal-dance" : "v-animal-image";

    return (
        <div className="v-animal-avatar" style={avatarStyle}>
            <img
                src={avatarImage}
                alt={avatarName}
                className={conditionalClass}
            />
        </div>
    );
}

export default Animal;




