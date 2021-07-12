/*
 * @Description:
 * @Date: 2021-07-12 01:56:42 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-07-12 23:36:30 +0800
 * @LastEditors: JackChou
 */

import tree from './tree-shaking'
import { common } from '../common'
common()
false && tree.a()
console.log('search')
