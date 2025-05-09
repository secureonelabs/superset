/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { DataMaskStateWithId } from '@superset-ui/core';
import { isEmpty, isEqual } from 'lodash';
import { NATIVE_FILTER_PREFIX } from 'src/dashboard/components/nativeFilters/FiltersConfigModal/utils';

export const getDataMaskChangeTrigger = (
  dataMask: DataMaskStateWithId,
  previousDataMask: DataMaskStateWithId,
) => {
  let crossFiltersChanged = false;
  let nativeFiltersChanged = false;

  if (!isEmpty(dataMask) && !isEmpty(previousDataMask)) {
    for (const key in dataMask) {
      if (
        key.startsWith(NATIVE_FILTER_PREFIX) &&
        !isEqual(dataMask[key], previousDataMask[key])
      ) {
        nativeFiltersChanged = true;
        break;
      } else if (!isEqual(dataMask[key], previousDataMask[key])) {
        crossFiltersChanged = true;
        break;
      }
    }
  }
  return { crossFiltersChanged, nativeFiltersChanged };
};
