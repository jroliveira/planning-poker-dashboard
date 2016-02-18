/* */ 
"format cjs";
'use strict';
describe('longStackTraceZone', function () {
    var log;
    var lstz = global.zone.fork(global.Zone.longStackTraceZone).fork({
        reporter: function reporter(trace) {
            log.push(trace);
        }
    });
    beforeEach(function () {
        log = [];
    });
    it('should produce long stack traces', function (done) {
        lstz.run(function () {
            setTimeout(function () {
                setTimeout(function () {
                    setTimeout(function () {
                        expect(log[0]).toBe('Error: hello');
                        expect(log[1].split('--- ').length).toBe(4);
                        done();
                    }, 0);
                    throw new Error('hello');
                }, 0);
            }, 0);
        });
    });
    it('should filter out zone.js frames with default stackFramesFilter impl', function () {
        var zoneFrame = 'at Zone.bind (http://localhost:8080/node_modules/zone.js/dist/zone.js:84:48)';
        var nonZoneFrame = 'at a (http://localhost:8080/index.js:7:3)';
        expect(lstz.stackFramesFilter(zoneFrame)).toBe(false);
        expect(lstz.stackFramesFilter(nonZoneFrame)).toBe(true);
    });
    it('should filter based on stackFramesFilter', function (done) {
        lstz.fork({
            stackFramesFilter: function (line) {
                return line.indexOf('jasmine.js') === -1;
            }
        }).run(function () {
            setTimeout(function () {
                setTimeout(function () {
                    setTimeout(function () {
                        expect(log[1]).not.toContain('jasmine.js');
                        done();
                    }, 0);
                    throw new Error('hello');
                }, 0);
            }, 0);
        });
    });
    it('should expose LST via getLogStackTrace', function () {
        expect(lstz.getLongStacktrace()).toBeDefined();
    });
    it('should honor parent\'s fork()', function () {
        global.zone
            .fork({
            '+fork': function () { log.push('fork'); }
        })
            .fork(global.Zone.longStackTraceZone)
            .fork();
        expect(log).toEqual(['fork', 'fork']);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9uZy1zdGFjay10cmFjZS16b25lLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90ZXN0L2xvbmctc3RhY2stdHJhY2Utem9uZS5zcGVjLnRzIl0sIm5hbWVzIjpbInJlcG9ydGVyIl0sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7QUFFYixRQUFRLENBQUMsb0JBQW9CLEVBQUU7SUFDN0IsSUFBSSxHQUFHLENBQUM7SUFFUixJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsSUFBSSxDQUFDO1FBQy9ELFFBQVEsRUFBRSxrQkFBbUIsS0FBSztZQUNoQ0EsR0FBR0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7UUFDbEJBLENBQUNBO0tBQ0YsQ0FBQyxDQUFDO0lBRUgsVUFBVSxDQUFDO1FBQ1QsR0FBRyxHQUFHLEVBQUUsQ0FBQztJQUNYLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLGtDQUFrQyxFQUFFLFVBQVUsSUFBSTtRQUNuRCxJQUFJLENBQUMsR0FBRyxDQUFDO1lBQ1AsVUFBVSxDQUFDO2dCQUNULFVBQVUsQ0FBQztvQkFDVCxVQUFVLENBQUM7d0JBQ1QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQzt3QkFFcEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUM1QyxJQUFJLEVBQUUsQ0FBQztvQkFDVCxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQ04sTUFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDM0IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ1IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ1IsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxzRUFBc0UsRUFBRTtRQUN6RSxJQUFJLFNBQVMsR0FBRyw4RUFBOEUsQ0FBQztRQUMvRixJQUFJLFlBQVksR0FBRywyQ0FBMkMsQ0FBQztRQUUvRCxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3RELE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDMUQsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsMENBQTBDLEVBQUUsVUFBVSxJQUFJO1FBQzNELElBQUksQ0FBQyxJQUFJLENBQUM7WUFDUixpQkFBaUIsRUFBRSxVQUFVLElBQUk7Z0JBQy9CLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQzNDLENBQUM7U0FDRixDQUFDLENBQUMsR0FBRyxDQUFDO1lBQ0wsVUFBVSxDQUFDO2dCQUNULFVBQVUsQ0FBQztvQkFDVCxVQUFVLENBQUM7d0JBQ1QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUM7d0JBQzNDLElBQUksRUFBRSxDQUFDO29CQUNULENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDTixNQUFNLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUMzQixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDUixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDUixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLHdDQUF3QyxFQUFFO1FBQzNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2pELENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLCtCQUErQixFQUFFO1FBQ2xDLE1BQU0sQ0FBQyxJQUFJO2FBQ1IsSUFBSSxDQUFDO1lBQ0osT0FBTyxFQUFFLGNBQWEsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDMUMsQ0FBQzthQUNELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDO2FBQ3BDLElBQUksRUFBRSxDQUFDO1FBRVYsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ3hDLENBQUMsQ0FBQyxDQUFDO0FBRUwsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmRlc2NyaWJlKCdsb25nU3RhY2tUcmFjZVpvbmUnLCBmdW5jdGlvbiAoKSB7XG4gIHZhciBsb2c7XG5cbiAgdmFyIGxzdHogPSBnbG9iYWwuem9uZS5mb3JrKGdsb2JhbC5ab25lLmxvbmdTdGFja1RyYWNlWm9uZSkuZm9yayh7XG4gICAgcmVwb3J0ZXI6IGZ1bmN0aW9uIHJlcG9ydGVyICh0cmFjZSkge1xuICAgICAgbG9nLnB1c2godHJhY2UpO1xuICAgIH1cbiAgfSk7XG5cbiAgYmVmb3JlRWFjaChmdW5jdGlvbiAoKSB7XG4gICAgbG9nID0gW107XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgcHJvZHVjZSBsb25nIHN0YWNrIHRyYWNlcycsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgbHN0ei5ydW4oZnVuY3Rpb24gKCkge1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZXhwZWN0KGxvZ1swXSkudG9CZSgnRXJyb3I6IGhlbGxvJyk7XG5cbiAgICAgICAgICAgIGV4cGVjdChsb2dbMV0uc3BsaXQoJy0tLSAnKS5sZW5ndGgpLnRvQmUoNCk7XG4gICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgfSwgMCk7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdoZWxsbycpO1xuICAgICAgICB9LCAwKTtcbiAgICAgIH0sIDApO1xuICAgIH0pO1xuICB9KTtcblxuICBpdCgnc2hvdWxkIGZpbHRlciBvdXQgem9uZS5qcyBmcmFtZXMgd2l0aCBkZWZhdWx0IHN0YWNrRnJhbWVzRmlsdGVyIGltcGwnLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHpvbmVGcmFtZSA9ICdhdCBab25lLmJpbmQgKGh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC9ub2RlX21vZHVsZXMvem9uZS5qcy9kaXN0L3pvbmUuanM6ODQ6NDgpJztcbiAgICB2YXIgbm9uWm9uZUZyYW1lID0gJ2F0IGEgKGh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC9pbmRleC5qczo3OjMpJztcblxuICAgIGV4cGVjdChsc3R6LnN0YWNrRnJhbWVzRmlsdGVyKHpvbmVGcmFtZSkpLnRvQmUoZmFsc2UpO1xuICAgIGV4cGVjdChsc3R6LnN0YWNrRnJhbWVzRmlsdGVyKG5vblpvbmVGcmFtZSkpLnRvQmUodHJ1ZSk7XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgZmlsdGVyIGJhc2VkIG9uIHN0YWNrRnJhbWVzRmlsdGVyJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICBsc3R6LmZvcmsoe1xuICAgICAgc3RhY2tGcmFtZXNGaWx0ZXI6IGZ1bmN0aW9uIChsaW5lKSB7XG4gICAgICAgIHJldHVybiBsaW5lLmluZGV4T2YoJ2phc21pbmUuanMnKSA9PT0gLTE7XG4gICAgICB9XG4gICAgfSkucnVuKGZ1bmN0aW9uICgpIHtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGV4cGVjdChsb2dbMV0pLm5vdC50b0NvbnRhaW4oJ2phc21pbmUuanMnKTtcbiAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICB9LCAwKTtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2hlbGxvJyk7XG4gICAgICAgIH0sIDApO1xuICAgICAgfSwgMCk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgZXhwb3NlIExTVCB2aWEgZ2V0TG9nU3RhY2tUcmFjZScsIGZ1bmN0aW9uICgpIHtcbiAgICBleHBlY3QobHN0ei5nZXRMb25nU3RhY2t0cmFjZSgpKS50b0JlRGVmaW5lZCgpO1xuICB9KTtcblxuICBpdCgnc2hvdWxkIGhvbm9yIHBhcmVudFxcJ3MgZm9yaygpJywgZnVuY3Rpb24gKCkge1xuICAgIGdsb2JhbC56b25lXG4gICAgICAuZm9yayh7XG4gICAgICAgICcrZm9yayc6IGZ1bmN0aW9uKCkgeyBsb2cucHVzaCgnZm9yaycpOyB9XG4gICAgICB9KVxuICAgICAgLmZvcmsoZ2xvYmFsLlpvbmUubG9uZ1N0YWNrVHJhY2Vab25lKVxuICAgICAgLmZvcmsoKTtcblxuICAgIGV4cGVjdChsb2cpLnRvRXF1YWwoWydmb3JrJywgJ2ZvcmsnXSk7XG4gIH0pO1xuXG59KTtcbiJdfQ==