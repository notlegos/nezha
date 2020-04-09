/**
* Functions to Planet sensor by ELECFREAKS Co.,Ltd.
*/
//% color=#0000ff  icon="\uf06d" block="Planet_Basic" blockId="Planet"
namespace Planet {
///////////////////////// matrixInit/////////////////////

    let initializedMatrix = false
    const HT16K33_ADDRESS = 0x70
    const HT16K33_BLINK_CMD = 0x80
    const HT16K33_BLINK_DISPLAYON = 0x01
    const HT16K33_CMD_BRIGHTNESS = 0xE0
    let matBuf = pins.createBuffer(17)
    function matrixInit() {
        i2ccmd(HT16K33_ADDRESS, 0x21);// turn on oscillator
        i2ccmd(HT16K33_ADDRESS, HT16K33_BLINK_CMD | HT16K33_BLINK_DISPLAYON | (0 << 1));
        i2ccmd(HT16K33_ADDRESS, HT16K33_CMD_BRIGHTNESS | 0xF);
    }
    function i2ccmd(addr: number, value: number) {
        let buf = pins.createBuffer(1)
        buf[0] = value
        pins.i2cWriteBuffer(addr, buf)
    }
    function matrixShow() {
        matBuf[0] = 0x00;
        pins.i2cWriteBuffer(HT16K33_ADDRESS, matBuf);
    }
    ///////////////////////////////
    export enum DigitalRJPin {
        //% block="J1 (P1,P8)"
        J1,
        //% block="J2 (P2,P12)"
        J2,
        //% block="J3 (P13,P14)"
        J3,
        //% block="J4 (P15,P16)"
        J4
    }
    export enum AnalogRJPin {
        //% block="J1 (P1,P8)"
        J1,
        //% block="J2 (P2,P12)"
        J2
    }

    //% block="at pin IIC Matrix Refresh"
    //% group=Matrix subcategory=Output
    export function MatrixRefresh(): void {
        if (!initializedMatrix) {
            matrixInit();
            initializedMatrix = true;
        }
        matrixShow();
    }

    //% block="at pin IIC Matrix Clear"
    //% group=Matrix subcategory=Output
    export function MatrixClear(): void {
        if (!initializedMatrix) {
            matrixInit();
            initializedMatrix = true;
        }
        for (let i = 0; i < 16; i++) {
            matBuf[i + 1] = 0;
        }
        matrixShow();
    }
    //% block="at pin IIC Matrix Draw|X %x|Y %y"
    //% group=Matrix subcategory=Output
    export function MatrixDraw(x: number, y: number): void {
        if (!initializedMatrix) {
            matrixInit();
            initializedMatrix = true;
        }
        x = Math.round(x)
        y = Math.round(y)

        let idx = y * 2 + Math.idiv(x, 8);

        let tmp = matBuf[idx + 1];
        tmp |= (1 << (x % 8));
        matBuf[idx + 1] = tmp;
    }
    //% block="at pin IIC Matrix show emoji %ID"
    //% group=Matrix subcategory=Output
    export function MatrixEmoji(ID: emojiList) {
        MatrixClear();
        let point;
        switch (ID) {
            case 0:
                point = [[2, 0], [13, 0],
                [3, 1], [12, 1],
                [4, 2], [11, 2],
                [3, 3], [12, 3],
                [2, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [13, 4],
                [5, 5], [7, 5], [8, 5], [10, 5],
                [5, 6], [10, 6],
                [6, 7], [7, 7], [8, 7], [9, 7]
                ];
                break;
            case 1:
                point = [[2, 1], [3, 1], [13, 1], [12, 1],
                [2, 2], [3, 2], [13, 2], [12, 2],
                [2, 3], [3, 3], [13, 3], [12, 3],
                [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5],
                [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6]
                ];
                break;
            case 2:
                point = [[1, 2], [5, 2], [10, 2], [14, 2],
                [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [10, 3], [11, 3], [12, 3], [13, 3], [14, 3],
                [2, 4], [3, 4], [4, 4], [11, 4], [12, 4], [13, 4],
                [6, 6], [7, 6], [8, 6], [9, 6],
                [5, 7], [10, 7]
                ];
                break;
            case 3:
                point = [[2, 1], [3, 1], [13, 1], [12, 1],
                [2, 2], [3, 2], [13, 2], [12, 2],
                [2, 3], [3, 3], [13, 3], [12, 3],
                [5, 5], [10, 5],
                [6, 6], [7, 6], [8, 6], [9, 6]
                ];
                break;
            case 4:
                point = [[2, 0], [13, 0],
                [3, 1], [12, 1],
                [3, 2], [4, 2], [11, 2], [12, 2],
                [3, 3], [4, 3], [11, 3], [12, 3],
                [6, 6], [7, 6], [8, 6], [9, 6],
                [5, 7], [10, 7]
                ];
                break;
        }
        let index_max = point.length
        for (let index = 0; index < index_max; index++) {
            MatrixDraw(point[index][0], point[index][1])
        }
        MatrixRefresh();
    }

}