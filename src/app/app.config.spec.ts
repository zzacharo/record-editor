/*
 * This file is part of ng2-json-editor.
 * Copyright (C) 2016 CERN.
 *
 * ng2-json-editor is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation; either version 2 of the
 * License, or (at your option) any later version.
 *
 * ng2-json-editor is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with ng2-json-editor; if not, write to the Free Software Foundation, Inc.,
 * 59 Temple Place, Suite 330, Boston, MA 02111-1307, USA.
 * In applying this license, CERN does not
 * waive the privileges and immunities granted to it by virtue of its status
 * as an Intergovernmental Organization or submit itself to any jurisdiction.
*/


import { AppConfigService } from './app-config.service';

describe('AppConfigService', () => {

  let service: AppConfigService;

  beforeEach(() => {
    service = new AppConfigService();
  });

  it('should get a merged config for an hep type', () => {
    service.jsonEditorConfigs = {
      hep: {
        default: {
          schemaOptions: {
            a: 'default-a',
            b: 'default-b'
          }
        },
        anHepType: {
          schemaOptions: {
            b: 'anHepType-b',
            c: 'anHepType-c'
          }
        }
      }
    };

    let record = {
      $schema: 'http://foo/bar/hep.json',
      collections: [
        { primary: 'Foo' },
        { primary: 'HEP' },
        { primary: 'anHepType' },
        { primary: 'Bar' }
      ]
    };

    let expectedConfig = {
      schemaOptions: {
        a: 'default-a',
        b: 'anHepType-b',
        c: 'anHepType-c'
      }
    };

    expect(service.getConfigForRecord(record)).toEqual(expectedConfig);
  });

  it('should get default config if hep type not found in CONFIGS', () => {
    service.jsonEditorConfigs = {
      hep: {
        default: {
          schemaOptions: {
            a: 'default-a',
            b: 'default-b'
          }
        }
      }
    };

    let record = {
      $schema: 'http://foo/bar/hep.json',
      collections: [
        { primary: 'Foo' },
        { primary: 'HEP' },
        { primary: 'Bar' }
      ]
    };

    let expectedConfig = {
      schemaOptions: {
        a: 'default-a',
        b: 'default-b'
      }
    };

    expect(service.getConfigForRecord(record)).toEqual(expectedConfig);
  });

  it('should get config for non hep schema', () => {
    service.jsonEditorConfigs = {
      notHep: {
        default: {
          schemaOptions: {
            a: 'notHep-a',
            b: 'notHep-b'
          }
        }
      }
    };

    let record = {
      $schema: 'http://foo/bar/notHep.json'
    };

    let expectedConfig = {
      schemaOptions: {
        a: 'notHep-a',
        b: 'notHep-b'
      }
    };

    expect(service.getConfigForRecord(record)).toEqual(expectedConfig);
  });
});
